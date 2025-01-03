import pool from "../db/index.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createProduct = async ({
  name,
  price,
  description,
  availability,
  ratings,
}) => {
  const query = `
    INSERT INTO products (name, price, description, availability, ratings)
    VALUES (?, ?, ?, ?, ?)
  `;
  const [result] = await pool.execute(query, [
    name,
    price,
    description,
    availability,
    ratings || 0,
  ]);
  return result.insertId;
};

export const getAllProducts = async () => {
  const query = `SELECT * FROM products`;
  const [rows] = await pool.execute(query);
  return rows;
};

export const getAvailableProducts = async () => {
  const query = `SELECT * FROM products WHERE availability = TRUE`;
  const [rows] = await pool.execute(query);
  return rows;
};

export const updateProduct = async (id, updates) => {
  const query = `
    UPDATE products
    SET name = ?, price = ?, description = ?, availability = ?, ratings = ?
    WHERE id = ?
  `;
  const [result] = await pool.execute(query, [
    updates.name,
    updates.price,
    updates.description,
    updates.availability,
    updates.ratings,
    id,
  ]);
  return result.affectedRows > 0;
};

export const removeProduct = async (id) => {
  const query = `DELETE FROM products WHERE id = ?`;
  const [result] = await pool.execute(query, [id]);
  return result.affectedRows > 0;
};
