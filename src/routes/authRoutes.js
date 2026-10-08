import express from "express";
import { getMe, login } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const authRouter = express.Router();
authRouter.get("/", login);
authRouter.get("/me", authMiddleware, getMe);

export default authRouter;
