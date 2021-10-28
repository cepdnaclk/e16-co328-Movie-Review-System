import express from "express";

import {
  createReview,
  deleteReviewbyId,
  getAllReviewbyUserId,
  getReviewbyMovieId,
  getReviewbyUserId,
  updateReviewbyId,
} from "../controllers/movieReviewController.js";

const router = express.Router();

router.post("/:movieId", createReview);
router.get("/:movieId", getReviewbyMovieId);

router.get("/:userId", getAllReviewbyUserId);
router.get("/:userId/:reviewId", getReviewbyUserId);
router.delete("/:userId/:reviewId", deleteReviewbyId);
router.patch("/:userId/:reviewId", updateReviewbyId);

export default router;
