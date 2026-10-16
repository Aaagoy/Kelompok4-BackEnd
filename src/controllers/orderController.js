import { Op } from "sequelize";
import db from "../config/database.js";
import { Order, OrderItem } from "../models/Order.js";
import Produk from "../models/productModel.js";

const STATUS_VALID = ["Menunggu", "Proses", "Selesai"];

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

const includeItems = [
  {
    model: OrderItem,
    as: "items",
    attributes: ["id", "id_produk", "nama_barang", "qty", "harga", "subtotal"],
  },
];

// Waktu WIB (UTC+7), format "YYYY-MM-DD HH:mm"
const waktuWIB = () =>
  new Date(Date.now() + 7 * 3600 * 1000)
    .toISOString()
    .replace("T", " ")
    .substring(0, 16);

const sendError = (res, error) =>
  res
    .status(error instanceof HttpError ? error.status : 500)
    .json({ message: error.message });

// 1. Ambil semua pesanan beserta rincian itemnya
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: includeItems,
      order: [["id", "DESC"]],
    });
    res.status(200).json({ data: orders });
  } catch (error) {
    sendError(res, error);
  }
};

// 2. Buat pesanan baru & nomor antrean (multi-item)
export const createOrder = async (req, res) => {
  const transaction = await db.transaction();
  try {
    const {
      nama_pelanggan,
      metode_pembayaran,
      status = "Menunggu",
      items,
    } = req.body;

    if (!nama_pelanggan?.trim())
      throw new HttpError(400, "Nama pelanggan wajib diisi!");
    if (!STATUS_VALID.includes(status))
      throw new HttpError(400, "Status tidak valid!");
    if (!Array.isArray(items) || items.length === 0)
      throw new HttpError(400, "Keranjang pesanan tidak boleh kosong!");

    // Gabungkan item yang produknya sama
    const qtyByProduk = new Map();
    for (const item of items) {
      const id = Number(item.id_produk);
      const qty = Number(item.qty);
      if (!Number.isInteger(id) || !Number.isInteger(qty) || qty <= 0)
        throw new HttpError(400, "Data item tidak valid!");
      qtyByProduk.set(id, (qtyByProduk.get(id) || 0) + qty);
    }

    // Cek produk & stok; harga diambil dari database, bukan dari FE
    const lines = [];
    let totalBelanja = 0;
    for (const [id, qty] of qtyByProduk) {
      const produk = await Produk.findByPk(id, {
        transaction,
        lock: transaction.LOCK.UPDATE,
      });
      if (!produk) throw new HttpError(404, `Produk #${id} tidak ditemukan`);

      const stok = Number(produk.stok);
      if (qty > stok)
        throw new HttpError(
          400,
          `Stok ${produk.nama_produk} tidak cukup (sisa ${stok})`,
        );

      const harga = Number(produk.harga);
      lines.push({ produk, qty, harga, stok });
      totalBelanja += harga * qty;
    }

    const waktu = waktuWIB();
    const tanggal = waktu.substring(0, 10);

    // Nomor antrean per hari (ANT-001, ANT-002, ...), reset tiap ganti hari
    const todayOrders = await Order.findAll({
      where: { waktu: { [Op.like]: `${tanggal}%` } },
      attributes: ["no_antrean"],
      transaction,
    });
    const maxSeq = todayOrders.reduce((max, o) => {
      const n = parseInt(String(o.no_antrean).replace("ANT-", ""), 10);
      return Number.isNaN(n) ? max : Math.max(max, n);
    }, 0);
    const noAntrean = `ANT-${String(maxSeq + 1).padStart(3, "0")}`;

    const newOrder = await Order.create(
      {
        no_antrean: noAntrean,
        waktu,
        nama_pelanggan: nama_pelanggan.trim(),
        metode_pembayaran: metode_pembayaran || "Tunai",
        total_belanja: totalBelanja,
        status,
      },
      { transaction },
    );

    await OrderItem.bulkCreate(
      lines.map(({ produk, qty, harga }) => ({
        order_id: newOrder.id,
        id_produk: produk.id_produk,
        nama_barang: produk.nama_produk,
        qty,
        harga,
        subtotal: harga * qty,
      })),
      { transaction },
    );

    // Kalau langsung "Selesai", stok langsung dikurangi
    if (status === "Selesai") {
      for (const { produk, qty, stok } of lines) {
        await produk.update({ stok: stok - qty }, { transaction });
      }
    }

    await transaction.commit();

    // Kirim balik pesanan lengkap beserta items (dipakai untuk struk)
    const saved = await Order.findByPk(newOrder.id, { include: includeItems });
    res.status(201).json({ message: "Pesanan berhasil dibuat!", data: saved });
  } catch (error) {
    if (!transaction.finished) await transaction.rollback();
    sendError(res, error);
  }
};

// 3. Update status pesanan (stok ikut disesuaikan saat masuk/keluar "Selesai")
export const updateOrderStatus = async (req, res) => {
  const transaction = await db.transaction();
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!STATUS_VALID.includes(status))
      throw new HttpError(400, "Status tidak valid!");

    const order = await Order.findByPk(id, {
      transaction,
      lock: transaction.LOCK.UPDATE,
    });
    if (!order) throw new HttpError(404, "Pesanan tidak ditemukan");

    const oldStatus = order.status;
    if (oldStatus !== status) {
      const toSelesai = oldStatus !== "Selesai" && status === "Selesai";
      const fromSelesai = oldStatus === "Selesai" && status !== "Selesai";

      if (toSelesai || fromSelesai) {
        const items = await OrderItem.findAll({
          where: { order_id: order.id },
          transaction,
        });

        for (const item of items) {
          if (!item.id_produk) continue; // data lama yang belum punya id_produk

          const produk = await Produk.findByPk(item.id_produk, {
            transaction,
            lock: transaction.LOCK.UPDATE,
          });
          if (!produk) continue;

          const stok = Number(produk.stok);
          if (toSelesai) {
            if (stok < item.qty)
              throw new HttpError(
                400,
                `Stok ${produk.nama_produk} tidak cukup (sisa ${stok})`,
              );
            await produk.update({ stok: stok - item.qty }, { transaction });
          } else {
            await produk.update({ stok: stok + item.qty }, { transaction });
          }
        }
      }

      await order.update({ status }, { transaction });
    }

    await transaction.commit();

    const updated = await Order.findByPk(id, { include: includeItems });
    res
      .status(200)
      .json({ message: "Status pesanan berhasil diperbarui", data: updated });
  } catch (error) {
    if (!transaction.finished) await transaction.rollback();
    sendError(res, error);
  }
};

// 4. Hapus pesanan (item ikut dihapus; stok tidak dikembalikan, sama seperti sebelumnya)
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByPk(id);
    if (!order) throw new HttpError(404, "Pesanan tidak ditemukan");

    await OrderItem.destroy({ where: { order_id: id } });
    await order.destroy();
    res.status(200).json({ message: "Pesanan berhasil dihapus" });
  } catch (error) {
    sendError(res, error);
  }
};