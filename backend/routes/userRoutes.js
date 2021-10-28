import express from "express";
import {
  getAllUsers,
  createUser,
  getUserbyId,
  deleteUserbyId,
  updateUserbyId,
} from "../controllers/userController.js";
import {
  getReviewbyUserId,
  deleteReviewbyId,
  updateReviewbyId,
} from "../controllers/movieReviewController.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", createUser);

router.get("/:id", getUserbyId);
router.delete("/:id", deleteUserbyId);
router.patch("/:id", updateUserbyId);

router.get("/:id/reviews", getReviewbyUserId);
router.delete("/:id/:reviewId", deleteReviewbyId);
router.patch("/:id/:reviewId", updateReviewbyId);

export default router;
