import express from "express";
import {
  createKategori,
  deleteKategori,
  getKategori,
  getKategoriById,
  updateKategori,
} from "../controllers/categoryController.js";

const kategoriRouter = express.Router();
<<<<<<< HEAD
kategoriRouter.get("/", getKategori);
kategoriRouter.get("/:id", getKategoriById);
kategoriRouter.post("/", createKategori);
kategoriRouter.put("/:id", updateKategori);
kategoriRouter.delete("/:id", deleteKategori);
=======
kategoriRouter.get("/kategori", getKategori);
kategoriRouter.get("/kategori/:id", getKategoriById);
kategoriRouter.post("/kategori", createKategori);
kategoriRouter.put("/kategori/:id", updateKategori);
kategoriRouter.delete("/kategori/:id", deleteKategori);
>>>>>>> bfb871f9446c6009a7fa22a5f1fbb036274e684f

export default kategoriRouter;
