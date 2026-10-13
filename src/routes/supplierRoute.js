import express from "express";
import {
  createSupplier,
  deleteSupplier,
  getSupplier,
  getSupplierById,
} from "../controllers/supplierController";

const supplierRouter = express.Router();
supplierRouter.get("/", getSupplier);
supplierRouter.get("/:id", getSupplierById);
supplierRouter.post("/", createSupplier);
supplierRouter.put("/:id", deleteSupplier);
