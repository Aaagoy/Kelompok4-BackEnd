import express from "express";
import { createAccount, deleteAccount, getMe, login, updateAccount } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const authRouter = express.Router();
authRouter.post("/", login);
authRouter.post("/register", createAccount);
authRouter.patch("/account", updateAccount);
authRouter.delete("/account",deleteAccount);
authRouter.get("/me", authMiddleware, getMe);

export default authRouter;
