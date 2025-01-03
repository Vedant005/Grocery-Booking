import pool from "../db/index.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const placeOrder = asyncHandler(async (req, res) => {
  const { userId, items } = req.body;

  if (!userId || !items || items.length === 0) {
    return res.status(400).json(new ApiError(400, "Invalid order data"));
  }

  const connection = await pool.getConnection();
  await connection.beginTransaction();

  try {
    let totalPrice = 0;

    for (const item of items) {
      const [product] = await connection.query(
        "SELECT price FROM product WHERE product_id = ?",
        [item.productId]
      );
      if (!product.length) {
        throw new Error(`Product with ID ${item.productId} not found`);
      }
      totalPrice += product[0].price * item.quantity;
    }

    const [orderResult] = await connection.query(
      "INSERT INTO orders (user_id, total_price) VALUES (?, ?)",
      [userId, totalPrice]
    );

    const orderId = orderResult.insertId;

    for (const item of items) {
      const [product] = await connection.query(
        "SELECT price FROM product WHERE product_id = ?",
        [item.productId]
      );

      const price = product[0].price;
      await connection.query(
        "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
        [orderId, item.productId, item.quantity, price]
      );
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
});

export const viewOrders = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json(new ApiError(400, "User ID is required"));
  }

  const [orders] = await pool.query(
    "SELECT * FROM orders WHERE user_id = ? ORDER BY order_date DESC",
    [userId]
  );

  const result = [];

  for (const order of orders) {
    const [items] = await pool.query(
      "SELECT oi.*, p.name AS product_name FROM order_items oi JOIN product p ON oi.product_id = p.product_id WHERE oi.order_id = ?",
      [order.order_id]
    );

    result.push({
      ...order,
      items,
    });
  }

  res
    .status(200)
    .json(new ApiResponse(200, result, "Orders fetched successfully"));
});
