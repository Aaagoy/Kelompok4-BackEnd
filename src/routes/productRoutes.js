import express from "express";
import {
  createProduk,
  deleteProduk,
  getProduk,
  getProdukById,
  updateProduk,
} from "../controllers/productController.js";

const router = express.Router();

<<<<<<< HEAD
router.get("/", getProduk);
router.get("/:id", getProdukById);
router.post("/", createProduk);
router.put("/:id", updateProduk);
router.delete("/:id", deleteProduk);
=======
router.get("/produk", getProduk);
router.get("/produk/:id", getProdukById);
router.post("/produk", createProduk);
router.put("/produk/:id", updateProduk);
router.delete("/produk/:id", deleteProduk);
>>>>>>> bfb871f9446c6009a7fa22a5f1fbb036274e684f

export default router;
