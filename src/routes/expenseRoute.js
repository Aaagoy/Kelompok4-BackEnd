import express from "express";

import { createExpense, deleteExpense, getExpenseById, getExpenses, updateExpense } from "../controllers/expenseController.js";

const expenseRouter = express.Router();

expenseRouter.get("/", getExpenses);
expenseRouter.get("/:id", getExpenseById);
expenseRouter.post("/", createExpense);
expenseRouter.patch("/:id", updateExpense);
expenseRouter.delete("/:id", deleteExpense);

export default expenseRouter;