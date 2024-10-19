import {
  getAllBook,
  createBook,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";
import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getAllBook);
router.get("/:id", verifyToken, getBookById);
router.post("/", verifyToken, createBook);
router.put("/:id", verifyToken, updateBook);
router.delete("/:id", verifyToken, deleteBook);

export default router;
