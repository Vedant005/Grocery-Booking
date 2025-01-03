import pool from "../db/index.js";

export const getProductPrice = async (productId) => {
  const [rows] = await pool.query(
    "SELECT price FROM product WHERE product_id = ?",
    [productId]
  );
  return rows[0];
};

export const createOrder = async (userId, totalPrice) => {
  const [result] = await pool.query(
    "INSERT INTO orders (user_id, total_price) VALUES (?, ?)",
    [userId, totalPrice]
  );
  return result.insertId;
};

export const addOrderItem = async (orderId, productId, quantity, price) => {
  await pool.query(
    "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
    [orderId, productId, quantity, price]
  );
};

export const getOrdersByUserId = async (userId) => {
  const [orders] = await pool.query(
    "SELECT * FROM orders WHERE user_id = ? ORDER BY order_date DESC",
    [userId]
  );
  return orders;
};

export const getOrderItemsByOrderId = async (orderId) => {
  const [items] = await pool.query(
    "SELECT oi.*, p.name AS product_name FROM order_items oi JOIN product p ON oi.product_id = p.product_id WHERE oi.order_id = ?",
    [orderId]
  );
  return items;
};
