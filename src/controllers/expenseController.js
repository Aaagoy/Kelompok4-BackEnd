import Expense from "../models/expenseModel.js";
import Supplier from "../models/supplierModel.js";
import { Op } from "sequelize";

// Tambahkan fungsi helper di atas atau di dalam file controller untuk generate nomor invoice otomatis
async function generateInvoiceNumber() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const datePrefix = `PO-${year}${month}${day}-`;

  const lastExpense = await Expense.findOne({
    where: {
      no_invoice: {
        [Op.like]: `${datePrefix}%`,
      },
    },
    order: [["id_pengeluaran", "DESC"]],
  });

  let sequence = 1;
  if (lastExpense) {
    const parts = lastExpense.no_invoice.split("-");
    const lastSeq = parseInt(parts[parts.length - 1], 10);
    if (!isNaN(lastSeq)) {
      sequence = lastSeq + 1;
    }
  }

  const formattedSeq = String(sequence).padStart(3, "0");
  return `${datePrefix}${formattedSeq}`;
}

// 1. Mendapatkan semua data transaksi pembelian beserta data supplier-nya
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({
      include: [
        {
          model: Supplier,
          attributes: ["id_supplier", "nama_supplier"],
        },
      ],
      order: [["id_pengeluaran", "DESC"]], // Urutkan berdasarkan ID pengeluaran terbaru
    });

    return res.status(200).json({
      message: "Berhasil mengambil data transaksi pembelian",
      data: expenses,
    });
  } catch (error) {
    console.error("Gagal mengambil data expense:", error);
    return res.status(500).json({ message: error.message });
  }
};

// GET pengeluaran berdasarkan ID
export const getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findByPk(id, {
      include: [
        {
          model: Supplier,
          attributes: ["id_supplier", "nama_supplier"],
        },
      ],
    });

    if (!expense) {
      return res
        .status(404)
        .json({ message: "Transaksi pembelian tidak ditemukan" });
    }

    return res.status(200).json({
      message: "Berhasil mengambil detail transaksi pembelian",
      data: expense,
    });
  } catch (error) {
    console.error("Gagal mengambil detail expense:", error);
    return res.status(500).json({ message: error.message });
  }
};

// 2. Mencatat Pembelian / Restock Baru
export const createExpense = async (req, res) => {
  try {
    // Tangkap 'harga' dari request body
    const { tanggal, id_supplier, nama_barang, jumlah, harga, status } =
      req.body;

    // Hitung total pengeluaran otomatis (jumlah x harga)
    const total_pengeluaran = Number(jumlah) * Number(harga);

    // Generate nomor invoice otomatis
    const no_invoice = await generateInvoiceNumber();

    const supplierCheck = await Supplier.findByPk(id_supplier);
    if (!supplierCheck) {
      return res
        .status(404)
        .json({ message: "Supplier tidak ditemukan dalam database" });
    }

    const newExpense = await Expense.create({
      no_invoice,
      tanggal,
      id_supplier,
      nama_barang,
      jumlah: Number(jumlah),
      harga: Number(harga),
      total_pengeluaran, // Hasil perkalian otomatis tersimpan di sini
      status: status || "Selesai",
    });

    return res.status(201).json({
      message: "Transaksi pembelian berhasil dicatat!",
      data: newExpense,
    });
  } catch (error) {
    console.error("Gagal mencatat pembelian:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Di expenseController.js
export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await Expense.update({ status }, { where: { id_pengeluaran: id } });
    res.status(200).json({ message: "Status berhasil diperbarui" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Menghapus Transaksi Pembelian
export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Expense.destroy({
      where: { id_expense: id }, // Sesuaikan primary key tabel
    });

    if (!deleted) {
      return res.status(404).json({ message: "Transaksi tidak ditemukan" });
    }

    return res
      .status(200)
      .json({ message: "Transaksi pembelian berhasil dihapus" });
  } catch (error) {
    console.error("Gagal menghapus transaksi:", error);
    return res.status(500).json({ message: error.message });
  }
};
