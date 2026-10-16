import express from "express";
import { getLaporanPenjualan } from "../controllers/LaporanController.js";

const laporanRouter = express.Router();
laporanRouter.get("/", getLaporanPenjualan);

export default laporanRouter;
