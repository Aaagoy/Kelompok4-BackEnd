import express from "express";
import cors from "cors";
import db from './config/database.js'

import authRouter from "./routes/authRoute.js";

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors({
  origin:"http://localhost:5173"
}));
app.use(express.json());
app.use("/api/auth",authRouter());

async function startServer(){
  try{
    await db.authenticate();
    await db.sync();
    
    app.listen(PORT, () => {
      console.log(`Server berjalan di http://localhost:${PORT}`);
    });
  }catch(error){
    console.error("Gagal menjalankan server, periksa : ",error);
  }
}

startServer();

