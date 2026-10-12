import express from "express";

import { createExpense, deleteExpense, getExpenseById, getExpenses } from "../controllers/expenseController.js";

function expenseRouter (){
    return express.Router()
    .get("/", getExpenses)
    .get("/:id_pengeluaran", getExpenseById)
    .post("/", createExpense)
    .delete("/:id_pengeluaran", deleteExpense)
}

export default expenseRouter;