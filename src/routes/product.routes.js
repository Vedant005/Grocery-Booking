import express from "express";
import {
  create,
  remove,
  update,
  viewAll,
  viewAvailable,
} from "../controllers/product.controller.js";

const router = express.Router();

router.post("/create", create);
router.get("/getAll", viewAll);
router.get("/getAvail", viewAvailable);
router.put("/update", update);
router.delete("/remove", remove);

export default router;
