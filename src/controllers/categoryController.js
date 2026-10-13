import { Op } from "sequelize";
import Kategori from "../models/categoryModel.js";

export const getKategori = async (req, res) => {
  try {
    const response = await Kategori.findAll();
<<<<<<< HEAD
    return res.status(200).json(response);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: error.message });
=======
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
>>>>>>> bfb871f9446c6009a7fa22a5f1fbb036274e684f
  }
};

export const getKategoriById = async (req, res) => {
  try {
    const response = await Kategori.findOne({
      where: {
        id_kategori: req.params.id,
      },
    });
<<<<<<< HEAD
    if (!response) {
      return res.status(404).json({ msg: "Kategori tidak ditemukan" });
    }
    return res.status(200).json(response);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: err.message });
=======
    res.status(200).json(response);
  } catch (err) {
    console.log(err.message);
>>>>>>> bfb871f9446c6009a7fa22a5f1fbb036274e684f
  }
};

export const createKategori = async (req, res) => {
  try {
    await Kategori.create(req.body);
<<<<<<< HEAD
    return res.status(201).json({ msg: "Kategori berhasil ditambah" });
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ msg: err.message || "Gagal menambah kategori" });
=======
    res.status(201).json({ msg: "Kategori berhasil ditambah" });
  } catch (err) {
    console.log(err.msg);
>>>>>>> bfb871f9446c6009a7fa22a5f1fbb036274e684f
  }
};

export const updateKategori = async (req, res) => {
  try {
    await Kategori.update(req.body, {
      where: {
        id_kategori: req.params.id,
      },
    });
<<<<<<< HEAD
    return res.status(200).json({ msg: "Kategori berhasil diedit" });
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ msg: err.message || "Gagal mengedit kategori" });
=======
    res.status(200).json({ msg: "Kategori berhasil diedit" });
  } catch (err) {
    console.log(err.msg);
>>>>>>> bfb871f9446c6009a7fa22a5f1fbb036274e684f
  }
};

export const deleteKategori = async (req, res) => {
  try {
    await Kategori.destroy({
      where: {
<<<<<<< HEAD
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
=======
        id_Kategori: req.params.id,
      },
    });
    res.status(200).json({ msg: "Kategori berhasil dihapus" });
  } catch (err) {
    console.log(err.msg);
>>>>>>> bfb871f9446c6009a7fa22a5f1fbb036274e684f
  }
};
