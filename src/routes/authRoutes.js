import express from "express";
<<<<<<< HEAD
import {
  createAccount,
  deleteAccount,
  getMe,
  getUsers,
  login,
  loginAdmin,
  updateAccount,
} from "../controllers/authController.js";
=======
import { createAccount, deleteAccount, getMe, login, updateAccount } from "../controllers/authController.js";
>>>>>>> bfb871f9446c6009a7fa22a5f1fbb036274e684f
import { authMiddleware } from "../middleware/authMiddleware.js";

const authRouter = express.Router();
authRouter.post("/", login);
<<<<<<< HEAD
authRouter.post("/", loginAdmin);
=======
authRouter.post("/admin", login);
>>>>>>> bfb871f9446c6009a7fa22a5f1fbb036274e684f
authRouter.post("/register", createAccount);
authRouter.patch("/account", updateAccount);
authRouter.delete("/account", deleteAccount);
authRouter.get("/me", authMiddleware, getMe);
<<<<<<< HEAD
authRouter.get("/", getUsers);
=======
>>>>>>> bfb871f9446c6009a7fa22a5f1fbb036274e684f

export default authRouter;
