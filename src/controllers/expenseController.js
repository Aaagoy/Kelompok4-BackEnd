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
    const { nm_brg, nm_supp, jml, hrg, stn, tgl } = req.body;
    const convertJml = Number(jml);
    const convertHrg = Number(hrg);

    if (!nm_brg || !nm_supp || 
      jml==null || jml===""||
      hrg==null || hrg===""||
      !stn || !tgl) {
      return res.status(400).json({Notifikasi: "Pastikan semua field wajib diisi !"});
    }
    if(!Number.isInteger(convertHrg)||!Number.isInteger(convertHrg)){
      return res.status(400).json({Notifikasi: "Pastikan harga dan jumlah berupa angka !"})
    }

    const t_pengeluaran = convertJml * convertHrg;

    await Expense.create({
      nama_barang: nm_brg, 
      nama_supplier : nm_supp,
      jumlah : convertJml, 
      harga : convertHrg,
      satuan: stn, 
      total_pengeluaran : t_pengeluaran,
      tanggal:tgl});

    res.status(200).json({Notifikasi: "Pengeluaran berhasil ditambah",});
  } catch (error) {
    res.status(500).json({Notifikasi: "Gagal menambahkan pengeluaran, periksa", error:error.message});
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