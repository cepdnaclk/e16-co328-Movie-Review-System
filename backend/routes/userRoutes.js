import express from "express";

import {
  getAllUsers,
  signin,
  signup,
  getUserbyId,
  deleteUserbyId,
  updateUserbyId,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUsers);

router.post("/signin", signin);
router.post("/signup", signup);

router.get("/:id", getUserbyId);
router.delete("/:id", deleteUserbyId);
router.patch("/:id", updateUserbyId);

export default router;
