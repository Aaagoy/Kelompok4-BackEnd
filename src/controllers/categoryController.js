import { Op } from "sequelize";
import Kategori from "../models/categoryModel.js";

export const getKategori = async (req, res) => {
  try {
    const response = await Kategori.findAll();
    return res.status(200).json(response);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: error.message });
  }
};

export const getKategoriById = async (req, res) => {
  try {
    const response = await Kategori.findOne({
      where: {
        id_kategori: req.params.id,
      },
    });
    if (!response) {
      return res.status(404).json({ msg: "Kategori tidak ditemukan" });
    }
    return res.status(200).json(response);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: err.message });
  }
};

export const createKategori = async (req, res) => {
  try {
    await Kategori.create(req.body);
    return res.status(201).json({ msg: "Kategori berhasil ditambah" });
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ msg: err.message || "Gagal menambah kategori" });
  }
};

export const updateKategori = async (req, res) => {
  try {
    await Kategori.update(req.body, {
      where: {
        id_kategori: req.params.id,
      },
    });
    return res.status(200).json({ msg: "Kategori berhasil diedit" });
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ msg: err.message || "Gagal mengedit kategori" });
  }
};

export const deleteKategori = async (req, res) => {
  try {
    await Kategori.destroy({
      where: {
        // PERBAIKAN: Mengubah id_Kategori (K besar) menjadi id_kategori (k kecil)
        id_kategori: req.params.id,
      },
    });
    return res.status(200).json({ msg: "Kategori berhasil dihapus" });
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ msg: err.message || "Gagal menghapus kategori" });
  }
};
