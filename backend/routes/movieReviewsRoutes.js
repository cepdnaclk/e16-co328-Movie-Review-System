import express from "express";

import auth from "../middleware/auth.js";

import {
  createReview,
  deleteReviewbyId,
  getAllReviewbyUserId,
  getAllReviewbyMovieId,
  getReviewbyUserId,
  updateReviewbyId,
} from "../controllers/movieReviewController.js";

const router = express.Router();

router.post("/:movieId", auth, createReview);
router.get("/:movieId", auth, getAllReviewbyMovieId);

router.get("/:userId/list", auth, getAllReviewbyUserId);
router.get("/:userId/:reviewId", auth, getReviewbyUserId);
router.delete("/:userId/:reviewId", auth, deleteReviewbyId);
router.patch("/:userId/:reviewId", auth, updateReviewbyId);

export default router;
