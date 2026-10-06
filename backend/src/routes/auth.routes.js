import express from "express";
import {login} from "../controllers/auth.controller.js";

function router(){
    return express.Router()
    .post("/api/auth/login", login);
}

export default router;