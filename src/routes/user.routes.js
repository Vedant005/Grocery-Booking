import express from "express";
import { getUsers, login, register } from "../controllers/user.controller.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getAll", getUsers);

export default router;
