import { Op } from "sequelize";
import Kategori from "../models/categoryModel.js";

export const getKategori = async (req, res) => {
  try {
    const response = await Kategori.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getKategoriById = async (req, res) => {
  try {
    const response = await Kategori.findOne({
      where: {
        id_kategori: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (err) {
    console.log(err.message);
  }
};

export const createKategori = async (req, res) => {
  try {
    await Kategori.create(req.body);
    res.status(201).json({ msg: "Kategori berhasil ditambah" });
  } catch (err) {
    console.log(err.msg);
  }
};

export const updateKategori = async (req, res) => {
  try {
    await Kategori.update(req.body, {
      where: {
        id_kategori: req.params.id,
      },
    });
    res.status(200).json({ msg: "Kategori berhasil diedit" });
  } catch (err) {
    console.log(err.msg);
  }
};

export const deleteKategori = async (req, res) => {
  try {
    await Kategori.destroy({
      where: {
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
