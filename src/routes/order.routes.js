import express from "express";
import { placeOrder, viewOrders } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/orders", placeOrder);
router.get("/orders/:userId", viewOrders);

export default router;
