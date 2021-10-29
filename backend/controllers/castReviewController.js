import mongoose from "mongoose";
import CastReview from "../models/castReviewModel.js";

export const createCastReview = async (req, res) => {
  console.log(`POST: createCastReview`);

  const { personId } = req.params;

  const { authorId, content, rating, createDate } = req.body;

  const newCastReview = new CastReview({
    _id: new mongoose.Types.ObjectId(),
    authorId,
    personId,
    content,
    rating,
    createDate,
  });

  try {
    await newCastReview.save();
    res.status(201).json(newCastReview);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
