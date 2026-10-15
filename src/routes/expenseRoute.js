import express from "express";
import {
  getExpenses,
  createExpense,
  deleteExpense,
  getExpenseById,
  updateStatus,
} from "../controllers/expenseController.js";

const expenseRouter = express.Router();

expenseRouter.get("/", getExpenses);
expenseRouter.get("/:id", getExpenseById);
expenseRouter.post("/", createExpense);
expenseRouter.delete("/:id", deleteExpense);
expenseRouter.put("/:id", updateStatus);

export default expenseRouter;
