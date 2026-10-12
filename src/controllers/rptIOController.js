import { Op } from "sequelize";
import Order from "../models/Order.js";
import Expense from "../models/expenseModel.js";

export const getReport = async (req, res) => {
  try {
    const { dari, sampai, jenis, keterangan } = req.query;

    // Validasi jenis transaksi
    if (jenis && !["pemasukan", "pengeluaran"].includes(jenis)) {
      return res.status(400).json({ Notifikasi: "Jenis harus pemasukan atau pengeluaran" });
    }

    // Membuat filter tanggal
    const dateFilter = {};

    if (dari) {
      const startDate = new Date(`${dari}T00:00:00`);

      if (Number.isNaN(startDate.getTime())) {
        return res.status(400).json({ Notifikasi: "Format tanggal dari tidak valid" });
      }

      dateFilter[Op.gte] = startDate;
    }

    if (sampai) {
      const endDate = new Date(`${sampai}T23:59:59.999`);

      if (Number.isNaN(endDate.getTime())) {
        return res.status(400).json({ Notifikasi: "Format tanggal sampai tidak valid" });
      }

      dateFilter[Op.lte] = endDate;
    }

    // Ambil data pemasukan
    let pemasukan = [];

    if (!jenis || jenis === "pemasukan") {
      const whereOrder = {};

      if (Object.keys(dateFilter).length > 0) {
        whereOrder.createdAt = dateFilter;
      }

      if (keterangan) {
        whereOrder.nomor_nota = {
          [Op.like]: `%${keterangan}%`,
        };
      }

      const orders = await Order.findAll({ where: whereOrder, order: [["createdAt", "DESC"]] });

      pemasukan = orders.map((order) => ({
        jenis: "pemasukan",
        tanggal: order.createdAt,
        keterangan: order.nomor_nota,
        nominal: Number(order.total_harga),
        metode_pembayaran: order.metode_pembayaran,
      }));
    }

    // Ambil data pengeluaran
    let pengeluaran = [];

    if (!jenis || jenis === "pengeluaran") {
      const whereExpense = {};

      if (Object.keys(dateFilter).length > 0) {
        whereExpense.tanggal = dateFilter;
      }

      if (keterangan) {
        whereExpense[Op.or] = [
          {
            no_invoice: {
              [Op.like]: `%${keterangan}%`,
            },
          },
          {
            nama_barang: {
              [Op.like]: `%${keterangan}%`,
            },
          },
          {
            nama_supplier: {
              [Op.like]: `%${keterangan}%`,
            },
          },
        ];
      }

      const expenses = await Expense.findAll({ where: whereExpense, order: [["tanggal", "DESC"]] });

      pengeluaran = expenses.map((expense) => ({
        jenis: "pengeluaran",
        tanggal: expense.tanggal,
        keterangan: `${expense.no_invoice} - ${expense.nama_barang} - ${expense.nama_supplier}`,
        nominal: Number(expense.total_pengeluaran),
        status: expense.status,
      }));
    }

    // Gabungkan dan urutkan berdasarkan tanggal
    const data = [...pemasukan, ...pengeluaran].sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));

    const totalPemasukan = pemasukan.reduce((total, item) => total + item.nominal, 0);

    const totalPengeluaran = pengeluaran.reduce((total, item) => total + item.nominal, 0);

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
    console.error("Error getLaporan:", error);

    return res.status(500).json({ Notifikasi: "Gagal mengambil laporan", error: error.message });
  }
};
