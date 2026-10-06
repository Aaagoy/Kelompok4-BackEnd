import express from "express";
import cors from "cors";
import dotenv from "dotenv";
<<<<<<< HEAD
import router from "./routes/auth.routes.js"; 

=======
import router from "./routes/productRoutes.js";
>>>>>>> cb0bb026c0ba96e2851c34687354ae68c97699db
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
<<<<<<< HEAD
app.use(router());
=======
app.use(router);
>>>>>>> cb0bb026c0ba96e2851c34687354ae68c97699db

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Backend Harafina berhasil berjalan" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
