import express from "express";
import { getReport } from "../controllers/rptIOController.js";

<<<<<<< HEAD
export default function rptRoute (){
=======
export default function rptRoute(){
>>>>>>> bfb871f9446c6009a7fa22a5f1fbb036274e684f
    return express.Router()
    .get("/", getReport)
}