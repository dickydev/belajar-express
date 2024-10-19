import {
  getAllUsers,
  getAllUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import express from "express";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getAllUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
