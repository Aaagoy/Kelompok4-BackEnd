import express from "express";
import {
  getOrders,
  createOrder,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.get("/", getOrders);
orderRouter.post("/", createOrder);
orderRouter.patch("/:id/status", updateOrderStatus);
orderRouter.delete("/:id", deleteOrder);

export default orderRouter;
