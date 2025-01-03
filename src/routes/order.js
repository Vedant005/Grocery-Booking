import express from "express";
import { placeOrder, viewOrders } from "../controllers/order.js";

const router = express.Router();

router.post("/", placeOrder);
router.get("/:userId", viewOrders);

export default router;
