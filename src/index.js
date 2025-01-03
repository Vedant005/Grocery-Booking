import { app } from "./app.js";
import dotenv from "dotenv";
import pool from "./db/index.js";

dotenv.config({
  path: "./.env",
});

const testDBConnection = async () => {
  try {
    await pool.query("SELECT 1");
    console.log("MySQL database connected successfully.");
  } catch (error) {
    console.error("Error connecting to MySQL database:", error.message);
    process.exit(1);
  }
};

const startServer = async () => {
  await testDBConnection();

  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();

// connectDB()
//   .then(() => {
//     app.listen(process.env.PORT || 8000, () => {
//       console.log(` Server is running at port : ${process.env.PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.log("Mongo Db connection failed !!", error);
//   });
