import { Op } from "sequelize";
import { Order, OrderItem } from "../models/Order.js";

// GET /laporan/penjualan?tanggal_mulai=YYYY-MM-DD&tanggal_selesai=YYYY-MM-DD&status=Selesai
export const getLaporanPenjualan = async (req, res) => {
  try {
    const { tanggal_mulai, tanggal_selesai, status } = req.query;

    const where = {};
    if (status && status !== "Semua") where.status = status;

    // Kolom `waktu` berformat "YYYY-MM-DD HH:mm", jadi bisa dibandingkan sebagai teks
    if (tanggal_mulai && tanggal_selesai) {
      where.waktu = {
        [Op.between]: [`${tanggal_mulai} 00:00`, `${tanggal_selesai} 23:59`],
      };
    } else if (tanggal_mulai) {
      where.waktu = { [Op.gte]: `${tanggal_mulai} 00:00` };
    } else if (tanggal_selesai) {
      where.waktu = { [Op.lte]: `${tanggal_selesai} 23:59` };
    }

    const orders = await Order.findAll({
      where,
      include: [
        {
          model: OrderItem,
          as: "items",
          attributes: ["id", "nama_barang", "qty", "harga", "subtotal"],
        },
      ],
      order: [
        ["waktu", "DESC"],
        ["id", "DESC"],
      ],
    });

    const data = orders.map((o) => ({
      id: o.id,
      no_antrean: o.no_antrean,
      nama_pelanggan: o.nama_pelanggan,
      tanggal: String(o.waktu).slice(0, 10),
      waktu: o.waktu,
      jumlah: Number(o.total_belanja),
      metode_pembayaran: o.metode_pembayaran,
      status: o.status,
      items: o.items,
    }));

    // Omzet dan rata-rata belanja (AOV) hanya dari pesanan "Selesai";
    // total transaksi = semua pesanan yang lolos filter
    const selesai = data.filter((d) => d.status === "Selesai");
    const total_pendapatan = selesai.reduce((sum, d) => sum + d.jumlah, 0);
    const total_transaksi = data.length;
    const rata_rata =
      selesai.length > 0 ? Math.round(total_pendapatan / selesai.length) : 0;

    res.status(200).json({
      summary: { total_pendapatan, total_transaksi, rata_rata },
      data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
