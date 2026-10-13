import express from "express";
<<<<<<< HEAD
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
=======
import { createSupplier, deleteSupplier, getSupplier, getSupplierById, updateSupplier } from "../controllers/supplierController.js";

export default function supplierRoute(){
    return express.Router()
    .get("/", getSupplier)
    .get("/:id_supplier", getSupplierById)
    .post("/create", createSupplier)
    .patch("/update/:id_supplier", updateSupplier)
    .delete("/delete/:id_supplier", deleteSupplier)
}
>>>>>>> bfb871f9446c6009a7fa22a5f1fbb036274e684f
