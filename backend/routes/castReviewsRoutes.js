import express from "express";

import {
  createCastReview,
  deleteCastReviewbyId,
  getAllCastReviewbyPersonId,
  getAllCastReviewbyUserId,
  getCastReviewbyUserId,
  updateCastReviewbyId,
} from "../controllers/castReviewController.js";

const router = express.Router();

router.post("/:personId", createCastReview);
router.get("/:personId", getAllCastReviewbyPersonId);

router.get("/:userId/list", getAllCastReviewbyUserId);
router.get("/:userId/:reviewId", getCastReviewbyUserId);
router.delete("/:userId/:reviewId", deleteCastReviewbyId);
router.patch("/:userId/:reviewId", updateCastReviewbyId);

export default router;
