import { Op } from "sequelize";
import Produk from "../models/productModel.js";

export const getProduk = async (req, res) => {
  try {
    const response = await Produk.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getProdukById = async (req, res) => {
  try {
    const response = await Produk.findOne({
      where: {
        id_produk: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (err) {
    console.log(err.message);
  }
};

export const createProduk = async (req, res) => {
  try {
    await Produk.create(req.body);
    res.status(201).json({ msg: "Produk berhasil ditambah" });
  } catch (err) {
    console.log(err.msg);
  }
};

export const updateProduk = async (req, res) => {
  try {
    await Produk.update(req.body, {
      where: {
        id_produk: req.params.id,
      },
    });
    res.status(200).json({ msg: "Produk berhasil diedit" });
  } catch (err) {
    console.log(err.msg);
  }
};

export const deleteProduk = async (req, res) => {
  try {
    await Produk.destroy({
      where: {
        id_produk: req.params.id,
      },
    });
    res.status(200).json({ msg: "Produk berhasil dihapus" });
  } catch (err) {
    console.log(err.msg);
  }
};
