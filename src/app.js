import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";
import orderRouter from "./routes/order.routes.js";
app.use("/api/users", userRouter);
app.use("/api/product", productRouter);
app.use("/api/orders", orderRouter);

export { app };
