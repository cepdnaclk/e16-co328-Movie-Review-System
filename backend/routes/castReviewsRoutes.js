import express from "express";

import {
  createCastReview,
  getAllCastReviewbyPersonId,
  getAllCastReviewbyUserId,
  getCastReviewbyUserId,
} from "../controllers/castReviewController.js";

const router = express.Router();

router.post("/:personId", createCastReview);
router.get("/:personId", getAllCastReviewbyPersonId);

router.get("/:userId/list", getAllCastReviewbyUserId);
router.get("/:userId/:reviewId", getCastReviewbyUserId);

export default router;
