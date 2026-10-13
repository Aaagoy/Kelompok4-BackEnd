import express from "express";
import { createSupplier, deleteSupplier, getSupplier, getSupplierById, updateSupplier } from "../controllers/supplierController.js";

export default function supplierRoute(){
    return express.Router()
    .get("/", getSupplier)
    .get("/:id_supplier", getSupplierById)
    .post("/create", createSupplier)
    .patch("/update/:id_supplier", updateSupplier)
    .delete("/delete/:id_supplier", deleteSupplier)
}