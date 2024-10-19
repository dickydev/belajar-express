import express from "express";
import {
  createCategory,
  getCategoriesWithBook,
} from "../controllers/categoryController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, createCategory);
router.get("/", verifyToken, getCategoriesWithBook);

export default router;
