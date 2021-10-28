import express from "express";

import {
  createReview,
  deleteReviewbyId,
  getAllReviewbyUserId,
  getAllReviewbyMovieId,
  getReviewbyUserId,
  updateReviewbyId,
} from "../controllers/movieReviewController.js";

const router = express.Router();

router.post("/:movieId", createReview);
router.get("/:movieId", getAllReviewbyMovieId);

router.get("/:userId/list", getAllReviewbyUserId);
router.get("/:userId/:reviewId", getReviewbyUserId);
router.delete("/:userId/:reviewId", deleteReviewbyId);
router.patch("/:userId/:reviewId", updateReviewbyId);

export default router;
