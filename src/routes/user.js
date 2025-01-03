import express from "express";
import { getUsers, login, register } from "../controllers/user.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/get", getUsers);

export default router;
