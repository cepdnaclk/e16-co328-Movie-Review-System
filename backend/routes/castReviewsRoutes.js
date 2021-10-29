import express from "express";

import { createCastReview } from "../controllers/castReviewController.js";

const router = express.Router();

router.post("/:personId", createCastReview);

export default router;
