import pool from "../db/index.js";

export const createUser = async (userData) => {
  const { fullName, email, password, role } = userData;
  try {
    const query = `
    INSERT INTO users (fullName, email, password,role )
    VALUES (?,?,?,?)
  `;
    const [result] = await pool.execute(query, [
      fullName,
      email,
      password,
      role,
    ]);
    return result.insertId;
  } catch (error) {
    console.log(error.message);
  }
};

export const findUserByEmail = async (email) => {
  try {
    const query = `SELECT * FROM users WHERE email = ? LIMIT 1`;
    const [rows] = await pool.execute(query, [email]);
    return rows[0];
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllUsers = async () => {
  const query = `SELECT * FROM users `;

  const [rows] = await pool.execute(query);

  return rows;
};
