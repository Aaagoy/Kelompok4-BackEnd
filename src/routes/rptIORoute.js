import express from "express";
import { getReport } from "../controllers/rptIOController.js";

export default function rptRoute (){
    return express.Router()
    .get("/", getReport)
}