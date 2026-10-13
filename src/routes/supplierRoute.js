import express from "express";
import {
  createSupplier,
  deleteSupplier,
  getSupplier,
  getSupplierById,
  updateSupplier,
} from "../controllers/supplierController.js";

const supplierRouter = express.Router();
supplierRouter.get("/", getSupplier);
supplierRouter.get("/:id", getSupplierById);
supplierRouter.post("/", createSupplier);
supplierRouter.put("/:id", updateSupplier);
supplierRouter.delete("/:id", deleteSupplier);

export default supplierRouter;
