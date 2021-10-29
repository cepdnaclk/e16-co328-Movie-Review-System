import express from "express";

import auth from "../middleware/auth.js";

import {
  getAllUsers,
  signin,
  signup,
  getUserbyId,
  deleteUserbyId,
  updateUserbyId,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", auth, getAllUsers);

router.post("/signin", signin);
router.post("/signup", signup);

router.get("/:id", auth, getUserbyId);
router.delete("/:id", auth, deleteUserbyId);
router.patch("/:id", auth, updateUserbyId);

export default router;
