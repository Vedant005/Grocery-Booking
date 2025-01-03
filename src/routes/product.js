import express from "express";
import {
  create,
  remove,
  update,
  viewAll,
  viewAvailable,
} from "../controllers/product.js";

const router = express.Router();

router.post("/create", create);
router.get("/view", viewAll);
router.get("/available", viewAvailable);
router.put("/update/:id", update);
router.delete("/remove/:id", remove);

export default router;
