import express from "express";
import cors from "cors";
import db from "./config/database.js";
import "dotenv/config";

import authRouter from "./routes/authRoutes.js";
import kategoriRouter from "./routes/kategoriRoute.js";
import router from "./routes/productRoutes.js";
import orderRouter from "./routes/orderRoute.js";
import expenseRouter from "./routes/expenseRoute.js";
// import { loginAdmin } from "./controllers/authController.js";

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.get("/", (req, res) => {
  res.send("Selamat datang di API Harafina!");
});
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/produk", router);
app.use("/api/kategori", kategoriRouter);
app.use("/api/order", orderRouter);
app.use("/api/expense", expenseRouter);
// app.use("/", loginAdmin);

const startServer = async () => {
  try {
    await db.authenticate();
    await db.sync();
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Gagal menjalankan server:", error);
  }
};
startServer();
