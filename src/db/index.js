import mysql from "mysql2";

const pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10,
    queueLimit: 0,
  })
  .promise();

export const testDBConnection = async () => {
  try {
    await pool.query("SELECT 1");
    console.log("MySQL database connected successfully.");
  } catch (error) {
    console.error("Error connecting to MySQL database:", error.message);
    process.exit(1);
  }
};

export default pool;
