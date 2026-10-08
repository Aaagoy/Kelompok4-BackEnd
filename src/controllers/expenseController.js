import Expense from "../models/expenseModel.js";

// GET semua pengeluaran
export const getExpenses = async (req, res) => {
  try {
    const response = await Expense.findAll({order: [["tanggal", "DESC"]]});

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({Notifikasi: "Gagal mengambil data pengeluaran, periksa"}, error);
  }
};

// GET pengeluaran berdasarkan ID
export const getExpenseById = async (req, res) => {
  try {
    const response = await Expense.findOne({where: { id: req.params.id }});

    if (!response) {
      return res.status(404).json({Notifikasi: "Data pengeluaran tidak ditemukan"});
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({Notifikasi: "Gagal mengambil data pengeluaran, periksa"},error);
  }
};

// POST tambah pengeluaran
export const createExpense = async (req, res) => {
  try {
    const { tanggal, keterangan, jumlah } = req.body;

    if (!tanggal || !keterangan || !jumlah) {
      return res.status(400).json({Notifikasi: "Tanggal, keterangan, dan jumlah wajib diisi"});
    }

    await Expense.create({tanggal, keterangan, jumlah});

    res.status(201).json({Notifikasi: "Pengeluaran berhasil ditambah",});
  } catch (error) {
    res.status(500).json({Notifikasi: "Gagal menambahkan pengeluaran, periksa"},error);
  }
};

// PUT edit pengeluaran
export const updateExpense = async (req, res) => {
  try {
    const { tanggal, keterangan, jumlah } = req.body;

    const expense = await Expense.findOne({where: {id: req.params.id}});

    if (!expense) {
      return res.status(404).json({Notifikasi: "Data pengeluaran tidak ditemukan"});
    }

    await Expense.update({tanggal, keterangan, jumlah}, {where: { id: req.params.id }});
    res.status(200).json({Notifikasi: "Pengeluaran berhasil diedit"});
  } catch (error) {
    res.status(500).json({Notifikasi: "Gagal mengedit pengeluaran, periksa"},error);
  }
};

// DELETE pengeluaran
export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOne({where: {id: req.params.id}});

    if (!expense) {
      return res.status(404).json({Notifikasi: "Data pengeluaran tidak ditemukan"});
    }

    await Expense.destroy({where: {id: req.params.id}});

    res.status(200).json({Notifikasi: "Pengeluaran berhasil dihapus"});
  } catch (error) {
    res.status(500).json({Notifikasi: "Gagal menghapus pengeluaran, periksa"},error);
  }
};