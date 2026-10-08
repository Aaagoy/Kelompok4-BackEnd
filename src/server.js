import express from "express";
import cors from "cors";
// import dotenv from "dotenv";
import db from "./config/database.js";
import router from "./routes/productRoutes.js";
import authRouter from "./routes/authRoutes.js";
import kategoriRouter from "./routes/kategoriRoute.js";
import orderRouter from "./routes/orderRoute.js";

// dotenv.config();

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
app.use("/api/auth/login", authRouter);
app.use("/api/produk", router);
app.use("/api/kategori", kategoriRouter);
app.use("/api/order", orderRouter);

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
