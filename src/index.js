import { app } from "./app.js";
import dotenv from "dotenv";
import { testDBConnection } from "./db/index.js";
import express from "express";
import routes from "./routes";
const app = express();

dotenv.config({
  path: "./.env",
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

const startServer = async () => {
  await testDBConnection();

  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
