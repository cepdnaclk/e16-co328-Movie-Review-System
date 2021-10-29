import express from "express";

import {
  createCastReview,
  getAllCastReviewbyPersonId,
  getAllCastReviewbyUserId,
} from "../controllers/castReviewController.js";

const router = express.Router();

router.post("/:personId", createCastReview);
router.get("/:personId", getAllCastReviewbyPersonId);

router.get("/:userId/list", getAllCastReviewbyUserId);

export default router;
