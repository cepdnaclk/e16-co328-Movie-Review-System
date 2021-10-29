import express from "express";
import {
  getAllUsers,
  createUser,
  getUserbyId,
  deleteUserbyId,
  updateUserbyId,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", createUser);

router.get("/:id", getUserbyId);
router.delete("/:id", deleteUserbyId);
router.patch("/:id", updateUserbyId);

export default router;
