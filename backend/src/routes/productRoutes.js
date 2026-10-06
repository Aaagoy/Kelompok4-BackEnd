import express from "express";
import {
  createProduk,
  deleteProduk,
  getProduk,
  getProdukById,
  updateProduk,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/produk", getProduk);
router.get("/produk/:id", getProdukById);
router.post("/produk", createProduk);
router.put("/produk/:id", updateProduk);
router.delete("/produk/:id", deleteProduk);

export default router;
