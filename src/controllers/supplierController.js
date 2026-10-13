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
