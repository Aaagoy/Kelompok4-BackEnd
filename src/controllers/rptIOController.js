import { Op } from "sequelize";
import Expense from "../models/expenseModel.js";
import Supplier from "../models/supplierModel.js";
import { Order } from "../models/Order.js";

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

// GET /report?dari=YYYY-MM-DD&sampai=YYYY-MM-DD&jenis=pemasukan|pengeluaran&keterangan=...
// Pemasukan  = pesanan offline berstatus "Selesai"
// Pengeluaran = pembelian/restock berstatus "Selesai"
export const getReport = async (req, res) => {
  try {
    const { dari, sampai, jenis, keterangan } = req.query;

    if (jenis && !["pemasukan", "pengeluaran"].includes(jenis)) {
      return res
        .status(400)
        .json({ Notifikasi: "Jenis harus pemasukan atau pengeluaran" });
    }
    if (dari && !DATE_REGEX.test(dari)) {
      return res
        .status(400)
        .json({ Notifikasi: "Format tanggal dari tidak valid (YYYY-MM-DD)" });
    }
    if (sampai && !DATE_REGEX.test(sampai)) {
      return res
        .status(400)
        .json({ Notifikasi: "Format tanggal sampai tidak valid (YYYY-MM-DD)" });
    }

    // ---------- PEMASUKAN (dari tabel orders) ----------
    let pemasukan = [];
    if (!jenis || jenis === "pemasukan") {
      const whereOrder = { status: "Selesai" };

      // Kolom waktu berformat "YYYY-MM-DD HH:mm" (teks)
      if (dari && sampai) {
        whereOrder.waktu = {
          [Op.between]: [`${dari} 00:00`, `${sampai} 23:59`],
        };
      } else if (dari) {
        whereOrder.waktu = { [Op.gte]: `${dari} 00:00` };
      } else if (sampai) {
        whereOrder.waktu = { [Op.lte]: `${sampai} 23:59` };
      }

      if (keterangan) {
        whereOrder[Op.or] = [
          { no_antrean: { [Op.like]: `%${keterangan}%` } },
          { nama_pelanggan: { [Op.like]: `%${keterangan}%` } },
        ];
      }

      const orders = await Order.findAll({
        where: whereOrder,
        order: [
          ["waktu", "DESC"],
          ["id", "DESC"],
        ],
      });

      pemasukan = orders.map((o) => ({
        jenis: "pemasukan",
        tanggal: String(o.waktu).slice(0, 10),
        kategori: "Penjualan Toko (Offline)",
        keterangan: `Pesanan ${o.no_antrean} (${o.nama_pelanggan})`,
        nominal: Number(o.total_belanja),
        metode_pembayaran: o.metode_pembayaran,
      }));
    }

    // ---------- PENGELUARAN (dari tabel pengeluaran / restock) ----------
    let pengeluaran = [];
    if (!jenis || jenis === "pengeluaran") {
      const whereExpense = { status: "Selesai" };

      // Kolom tanggal bertipe DATEONLY, cukup bandingkan string YYYY-MM-DD
      if (dari && sampai) {
        whereExpense.tanggal = { [Op.between]: [dari, sampai] };
      } else if (dari) {
        whereExpense.tanggal = { [Op.gte]: dari };
      } else if (sampai) {
        whereExpense.tanggal = { [Op.lte]: sampai };
      }

      if (keterangan) {
        whereExpense[Op.or] = [
          { no_invoice: { [Op.like]: `%${keterangan}%` } },
          { nama_barang: { [Op.like]: `%${keterangan}%` } },
          { "$supplier.nama_supplier$": { [Op.like]: `%${keterangan}%` } },
        ];
      }

      const expenses = await Expense.findAll({
        where: whereExpense,
        include: [
          { model: Supplier, attributes: ["id_supplier", "nama_supplier"] },
        ],
        order: [
          ["tanggal", "DESC"],
          ["id_pengeluaran", "DESC"],
        ],
      });

      pengeluaran = expenses.map((e) => ({
        jenis: "pengeluaran",
        tanggal: e.tanggal,
        kategori: "Pembelian / Restock",
        keterangan: `Restock: ${e.nama_barang} (${e.supplier?.nama_supplier ?? "-"})`,
        no_invoice: e.no_invoice,
        nominal: Number(e.total_pengeluaran),
        status: e.status,
      }));
    }

    // ---------- GABUNG ----------
    const data = [...pemasukan, ...pengeluaran].sort((a, b) =>
      String(b.tanggal).localeCompare(String(a.tanggal)),
    );

    const totalPemasukan = pemasukan.reduce((t, i) => t + i.nominal, 0);
    const totalPengeluaran = pengeluaran.reduce((t, i) => t + i.nominal, 0);

    return res.status(200).json({
      Notifikasi: "Laporan berhasil diambil",
      ringkasan: {
        total_pemasukan: totalPemasukan,
        total_pengeluaran: totalPengeluaran,
        saldo_bersih: totalPemasukan - totalPengeluaran,
      },
      jumlah_transaksi: data.length,
      data,
    });
  } catch (error) {
    console.error("Error getReport:", error);
    return res
      .status(500)
      .json({ Notifikasi: "Gagal mengambil laporan", error: error.message });
  }
};
