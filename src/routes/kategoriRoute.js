import express from "express";
import {
  createKategori,
  deleteKategori,
  getKategori,
  getKategoriById,
  updateKategori,
} from "../controllers/categoryController.js";

const kategoriRouter = express.Router();
kategoriRouter.get("/", getKategori);
kategoriRouter.get("/:id", getKategoriById);
kategoriRouter.post("/", createKategori);
kategoriRouter.put("/:id", updateKategori);
kategoriRouter.delete("/:id", deleteKategori);

export default kategoriRouter;
