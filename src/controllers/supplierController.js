<<<<<<< HEAD
import { Op } from "sequelize";
import Supplier from "../models/supplierModel.js";

export const getSupplier = async (req, res) => {
  try {
    const response = await Supplier.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getSupplierById = async (req, res) => {
  try {
    const response = await Supplier.findOne({
      where: {
        id_supplier: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (err) {
    console.log(err.message);
  }
};

export const createSupplier = async (req, res) => {
  try {
    await Supplier.create(req.body);
    res.status(201).json({ msg: "Supplier berhasil ditambah" });
  } catch (err) {
    console.log(err.msg);
  }
};

export const updateSupplier = async (req, res) => {
  try {
    await Supplier.update(req.body, {
      where: {
        id_supplier: req.params.id,
      },
    });
    res.status(200).json({ msg: "Supplier berhasil diedit" });
  } catch (err) {
    console.log(err.msg);
  }
};

export const deleteSupplier = async (req, res) => {
  try {
    await Supplier.destroy({
      where: {
        id_supplier: req.params.id,
      },
    });
    res.status(200).json({ msg: "Supplier berhasil dihapus" });
  } catch (err) {
    console.log(err.msg);
  }
};
=======
import Supplier from "../models/supplierModel.js";

export async function createSupplier(req, res) {
  let {  nama_supplier, alamat_supplier, nomor_telepon } = req.body;

  try {
    if (!nama_supplier || !alamat_supplier || !nomor_telepon) {
      return res.status(400).json({ Notifikasi: "Pastikan semua field terisi !" });
    }

    await Supplier.create({
      nm_supp : nama_supplier, 
      alt_supp : alamat_supplier, 
      no_telpSupp: nomor_telepon });
    return res.status(200).json({ Notifikasi: "Data supplier ditambahkan !"})
    
  } catch (error) {
    return res.status(500).json({ Notifikasi: "Akun tidak ditambahkan, periksa ", error:error.message});
  }
}

export async function updateSupplier(req, res){
  let { nama_supplier, alamat_supplier, nomor_telepon } = req.body;

  try{
    if( !nama_supplier|| !alamat_supplier|| !nomor_telepon){
      return res.status(400).json({Notifikasi : "Pastikan semua field terisi !"});
    }
    
    await Supplier.update({
      nm_supp : nama_supplier,
      alt_supp : alamat_supplier,
      no_telpSupp : nomor_telepon
    },{where : {id_supplier : req.params.id_supplier}});

    return res.status(200).json({ Notifikasi: "Data Supplier diperbarui !" });
  }catch(error){
    return res.status(500).json({ Notifikasi: "Gagal memperbarui data supplier, periksa ", error:error.message});
  }
}

export async function deleteSupplier(req, res){
  try{
    const respone = await Supplier.findByPk(req.params.id_supplier);
    if(!respone){
      return res.status(400).json({Notifikasi : "ID Supplier Tidak Ditemukan"});
    }

    await Supplier.destroy({where : {id_supplier : req.params.id_supplier}})

    res.status(200).json({Notifikasi : "Data supplier dihapus !"})
  }catch(error){
    res.status(500).json({Notifikasi : "Gagal menghapus data supplier, periksa",error:error.message});
  }
};

export async function getSupplier(req, res){
  try{
    const respone = await Supplier.findAll();
    res.status(200).json({Notifikasi : "Data supplier ditemukan", respone });
  }catch(error){
    return res.status(500).json({ Notifikasi: "Gagal mengambil data supplier, periksa ", error:error.message});
  }
}

export async function getSupplierById(req, res) {
  const { id_supplier } = req.params;

  try {
    // 1. Validasi ID
    if (!id_supplier || !/^\d+$/.test(id_supplier)) {
      return res.status(400).json({
        Notifikasi: "ID supplier harus berupa angka!",
      });
    }

    // 2. Cari supplier berdasarkan primary key
    const dataSupplier = await Supplier.findByPk(id_supplier);

    // 3. Jika supplier tidak ditemukan
    if (!dataSupplier) {
      return res.status(404).json({
        Notifikasi: "Data supplier tidak ditemukan!",
      });
    }

    // 4. Jika ditemukan, kirim data supplier
    return res.status(200).json({
      Notifikasi: "Data supplier berhasil ditemukan!",
      data: dataSupplier,
    });
  } catch (error) {
    console.error("Gagal mengambil data supplier:", error);

    return res.status(500).json({
      Notifikasi: "Gagal mengambil data supplier.",
    });
  }
}
>>>>>>> bfb871f9446c6009a7fa22a5f1fbb036274e684f
