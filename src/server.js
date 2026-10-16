import "dotenv/config";
import express from "express";
import cors from "cors";
import db from "./config/database.js";
import { Order, OrderItem } from "./models/Order.js";

import authRouter from "./routes/authRoutes.js";
import kategoriRouter from "./routes/kategoriRoute.js";
import router from "./routes/productRoutes.js";
import orderRouter from "./routes/orderRoute.js";
import expenseRouter from "./routes/expenseRoute.js";
import rptRoute from "./routes/rptIORoute.js";
import { getUsers, loginAdmin } from "./controllers/authController.js";
import supplierRouter from "./routes/supplierRoute.js";
import laporanRouter from "./routes/laporanRoute.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  }),
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Selamat datang di API Harafina!");
});

app.use("/api/auth", authRouter);
app.use("/users", getUsers);
app.use("/produk", router);
app.use("/kategori", kategoriRouter);
app.use("/order", orderRouter);
app.use("/expense", expenseRouter);
app.use("/report", rptRoute());
app.use("/admin/login", loginAdmin);
app.use("/supplier", supplierRouter);
app.use("/laporan", laporanRouter);

const startServer = async () => {
  try {
    await db.authenticate();
    await db.sync();

    // Jalankan sekali kalau struktur tabel order berubah (mis. kolom baru):
    // set DB_ALTER=true di .env, start server, lalu hapus/ubah jadi false.
    if (process.env.DB_ALTER === "true") {
      await Order.sync({ alter: true });
      await OrderItem.sync({ alter: true });
      console.log("Struktur tabel orders & order_items disinkronkan");
    }

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Gagal menjalankan server:", error);
  }
};
startServer();
