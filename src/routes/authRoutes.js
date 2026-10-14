import express from "express";
import {
  createAccount,
  deleteAccount,
  getMe,
  getUsers,
  login,
  loginAdmin,
  updateAccount,
} from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const authRouter = express.Router();
authRouter.post("/", login);
authRouter.post("/", loginAdmin);
authRouter.post("/register", createAccount);
authRouter.patch("/account/:id", updateAccount);
authRouter.delete("/account/:id", deleteAccount);
authRouter.get("/me", authMiddleware, getMe);
authRouter.get("/", getUsers);

export default authRouter;
