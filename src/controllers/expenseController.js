import Expense from "../models/expenseModel.js";

// GET semua pengeluaran
export const getExpenses = async (req, res) => {
  try {
    const response = await Expense.findAll({order: ["tanggal", "DESC"]});
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({Notifikasi: "Gagal mengambil data pembelian barang, periksa"}, error);
  }
};

// GET pengeluaran berdasarkan ID
export const getExpenseById = async (req, res) => {
  try {
    const {id_pengeluaran} = req.params;
    const response = await Expense.findOne({where: { id_pengeluaran }});

    if (!response) {
      return res.status(404).json({Notifikasi: "Data pembelian barang tidak ditemukan"});
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({Notifikasi: "Gagal mengambil data pembelian barang, periksa",error:error.message});
  }
};

// POST tambah pengeluaran
export const createExpense = async (req, res) => {
  try {
    const { no_ivc, tgl, nm_supp, nm_brg, jml, t_expense, sts } = req.body;
    const convertJml = Number(jml);
    const convertExpense = Number(t_expense);

    if (!no_ivc||!tgl ||
      !nm_supp||!nm_brg||  
      jml==null || jml===""||
      t_expense==null || t_expense===""||
      !sts) {
      return res.status(400).json({Notifikasi: "Pastikan semua field wajib diisi !"});
    
    }else if(!Number.isInteger(jml)||!Number.isInteger(t_expense) || 
    !Number.isInteger(convertJml)||!Number.isInteger(convertExpense)){
      
      return res.status(400).json({Notifikasi: "Pastikan harga dan jumlah berupa angka dan bilangan bulat !"})
    
    }else if(convertJml<=0 || convertExpense<=0){
      
      return res.status(400).json({Notifikasi: "Harga dan Jumlah harus bilangan positif !"})
    
    }else{
      await Expense.create({
        no_invoice: no_ivc,
        tanggal: tgl, 
        nama_supplier : nm_supp,
        nama_barang : nm_brg,
        jumlah : convertJml, 
        total_pengeluaran : convertExpense,
        status: sts});

      res.status(200).json({Notifikasi: "Pembelian barang berhasil ditambah",});
    }
  } catch (error) {
    res.status(500).json({Notifikasi: "Gagal menambahkan pengeluaran, periksa", error:error.message});
  }
};

// DELETE pengeluaran
export const deleteExpense = async (req, res) => {
  try {
    const {id_pengeluaran} = req.params;
    const expense = await Expense.findOne({where: {id_pengeluaran}});

    if (!expense) {
      
      return res.status(404).json({Notifikasi: "Data pembelian barang tidak ditemukan"});
    
    }

    await Expense.destroy({where: {id: req.params.id_pengeluaran}});

    res.status(200).json({Notifikasi: "Pembelian barang berhasil dihapus"});

  } catch (error) {
    
    res.status(500).json({Notifikasi: "Gagal menghapus data pembelian barang, periksa"},error);
  
  }
};