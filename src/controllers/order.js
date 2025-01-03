import {
  getProductPrice,
  createOrder,
  addOrderItem,
  getOrdersByUserId,
  getOrderItemsByOrderId,
} from "../models/order.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import pool from "../db/index.js";

export const placeOrder = async (req, res) => {
  const { userId, items } = req.body;

  if (!userId || !items || items.length === 0) {
    return res.status(400).json(new ApiError(400, "Invalid order data"));
  }

  const connection = await pool.getConnection();
  await connection.beginTransaction();

  try {
    let totalPrice = 0;

    for (const item of items) {
      const product = await getProductPrice(item.productId);
      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found`);
      }
      totalPrice += product.price * item.quantity;
    }

    const orderId = await createOrder(userId, totalPrice);

    for (const item of items) {
      const product = await getProductPrice(item.productId);
      await addOrderItem(orderId, item.productId, item.quantity, product.price);
    }

    await connection.commit();
    connection.release();

    res
      .status(201)
      .json(new ApiResponse(200, { orderId }, "Order placed successfully"));
  } catch (error) {
    await connection.rollback();
    connection.release();
    res
      .status(500)
      .json(new ApiError(500, "Failed to place order", error.message));
  }
};

export const viewOrders = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json(new ApiError(400, "User ID is required"));
  }

  try {
    const orders = await getOrdersByUserId(userId);
    const result = [];

    for (const order of orders) {
      const items = await getOrderItemsByOrderId(order.order_id);
      result.push({ ...order, items });
    }

    res
      .status(200)
      .json(new ApiResponse(200, result, "Orders fetched successfully"));
  } catch (error) {
    res
      .status(500)
      .json(new ApiError(500, "Failed to fetch orders", error.message));
  }
};
