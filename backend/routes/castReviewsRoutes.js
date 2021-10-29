import express from "express";

import {
  createCastReview,
  getAllCastReviewbyPersonId,
} from "../controllers/castReviewController.js";

const router = express.Router();

router.post("/:personId", createCastReview);
router.get("/:personId", getAllCastReviewbyPersonId);

export default router;
