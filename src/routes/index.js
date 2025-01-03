import express from "express";
import orderRoutes from "./order.js";
import productRoutes from "./product.js";
import userRoutes from "./user.js";

const router = express.Router();

router.use("/orders", orderRoutes);
router.use("/products", productRoutes);
router.use("/users", userRoutes);

export default router;
