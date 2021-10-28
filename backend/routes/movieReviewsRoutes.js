import express from "express";

import {
  createReview,
  getReviewbyMovieId,
} from "../controllers/movieReviewController.js";

const router = express.Router();

router.post("/:movieId", createReview);
router.get("/:movieId", getReviewbyMovieId);

export default router;
