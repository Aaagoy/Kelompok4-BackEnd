import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/productRoutes.js";
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(router);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Backend Harafina berhasil berjalan" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
