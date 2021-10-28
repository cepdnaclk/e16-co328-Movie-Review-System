import express from "express";

import { createReview } from "../controllers/movieReviewController.js";

const router = express.Router();

router.post("/:movieId", createReview);

export default router;
