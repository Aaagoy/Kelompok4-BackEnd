import express from "express";
import {
  createProduk,
  deleteProduk,
  getProduk,
  getProdukById,
  updateProduk,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProduk);
router.get("/:id", getProdukById);
router.post("/", createProduk);
router.put("/:id", updateProduk);
router.delete("/:id", deleteProduk);

export default router;
