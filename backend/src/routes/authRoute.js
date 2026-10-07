import express from "express";
import {getMe, login} from "../controllers/authController.js";
import {authMiddleware} from "../middleware/authMiddleware.js";

function authRouter(){
    return express.Router()
    .post("/api/auth/login", login)
    .get("/me", authMiddleware, getMe)
}

export default authRouter;