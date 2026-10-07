import express from "express";
import { login } from "../controllers/authController.js";

function authRouter() {
  return express.Router().post("/api/auth/login", login);
}

export default authRouter;
