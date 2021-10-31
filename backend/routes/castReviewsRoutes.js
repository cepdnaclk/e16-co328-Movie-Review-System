import express from "express";

import auth from "../middleware/auth.js";

import {
  createCastReview,
  deleteCastReviewbyId,
  getAllCastReviewbyPersonId,
  getAllCastReviewbyUserId,
  getCastReviewbyUserId,
  updateCastReviewbyId,
} from "../controllers/castReviewController.js";

const router = express.Router();

router.post("/:personId", auth, createCastReview);
router.get("/:personId", getAllCastReviewbyPersonId);

router.get("/:userId/list", auth, getAllCastReviewbyUserId);
router.get("/:userId/:reviewId", auth, getCastReviewbyUserId);
router.delete("/:userId/:reviewId", auth, deleteCastReviewbyId);
router.patch("/:userId/:reviewId", auth, updateCastReviewbyId);

export default router;
