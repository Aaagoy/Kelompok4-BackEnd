import express from "express";
import {
  createKategori,
  deleteKategori,
  getKategori,
  getKategoriById,
  updateKategori,
} from "../controllers/categoryController.js";

const kategoriRouter = express.Router();
kategoriRouter.get("/kategori", getKategori);
kategoriRouter.get("/kategori/:id", getKategoriById);
kategoriRouter.post("/kategori", createKategori);
kategoriRouter.put("/kategori/:id", updateKategori);
kategoriRouter.delete("/kategori/:id", deleteKategori);

export default kategoriRouter;
