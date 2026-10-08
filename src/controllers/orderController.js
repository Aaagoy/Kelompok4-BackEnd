import db from "../config/database.js";
import Order from "../models/Order.js";
import OrderDetail from "../models/orderDetail.js";
import Product from "../models/productModel.js";

export const createOrder = async (req, res) => {
  const transaction = await db.transaction();

  try {
    const { items, metode_pembayaran, bayar } = req.body;
    const id_user = req.user?.id_user || 1; // Ambil dari JWT req.user atau default

    if (!items || items.length === 0) {
      return res
        .status(400)
        .json({ message: "Item pesanan tidak boleh kosong" });
    }

    let totalHarga = 0;
    const detailItems = [];

    // Validasi stok & hitung total harga
    for (const item of items) {
      const product = await Product.findByPk(item.id_product, { transaction });

      if (!product) {
        await transaction.rollback();
        return res
          .status(404)
          .json({ message: `Produk ID ${item.id_product} tidak ditemukan` });
      }

      if (product.stok < item.jumlah) {
        await transaction.rollback();
        return res.status(400).json({
          message: `Stok produk ${product.nama_produk} tidak mencukupi (sisa: ${product.stok})`,
        });
      }

      const subtotal = product.harga * item.jumlah;
      totalHarga += subtotal;

      detailItems.push({
        id_product: item.id_product,
        jumlah: item.jumlah,
        harga_satuan: product.harga,
        subtotal: subtotal,
        productInstance: product,
      });
    }

    if (bayar < totalHarga) {
      await transaction.rollback();
      return res.status(400).json({ message: "Uang pembayaran kurang" });
    }

    const kembalian = bayar - totalHarga;
    const nomorNota = `INV-${Date.now()}`;

    // 1. Simpan Header Order
    const newOrder = await Order.create(
      {
        nomor_nota: nomorNota,
        id_user,
        total_harga: totalHarga,
        metode_pembayaran,
        bayar,
        kembalian,
      },
      { transaction },
    );

    // 2. Simpan Detail & Potong Stok Produk
    for (const detail of detailItems) {
      await OrderDetail.create(
        {
          id_order: newOrder.id_order,
          id_product: detail.id_product,
          jumlah: detail.jumlah,
          harga_satuan: detail.harga_satuan,
          subtotal: detail.subtotal,
        },
        { transaction },
      );

      // Kurangi stok produk
      await detail.productInstance.update(
        { stok: detail.productInstance.stok - detail.jumlah },
        { transaction },
      );
    }

    await transaction.commit();

    return res.status(201).json({
      message: "Transaksi kasir berhasil",
      data: {
        nomor_nota: newOrder.nomor_nota,
        total_harga: totalHarga,
        bayar,
        kembalian,
      },
    });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({ message: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: OrderDetail,
          as: "items",
          include: [{ model: Product, as: "product" }],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
