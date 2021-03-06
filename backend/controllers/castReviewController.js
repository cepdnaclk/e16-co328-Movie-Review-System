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

export const getAllCastReviewbyPersonId = async (req, res) => {
  console.log(`GET: getAllCastReviewbyPersonId`);

  const { personId: id } = req.params;
  try {
    const castReviews = await CastReview.find({ personId: id });
    res.status(200).json(castReviews);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllCastReviewbyUserId = async (req, res) => {
  console.log(`GET: getAllCastReviewbyUserId`);

  const { userId } = req.params;
  try {
    const castReviews = await CastReview.find({ authorId: userId });
    res.status(200).json(castReviews);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCastReviewbyUserId = async (req, res) => {
  console.log(`GET: getCastReviewbyUserId`);

  const { userId, reviewId } = req.params;
  try {
    const castReview = await CastReview.find({
      _id: reviewId,
      authorId: userId,
    });
    res.status(200).json(castReview);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteCastReviewbyId = async (req, res) => {
  console.log(`DELETE: deleteCastReviewbyId`);

  const { reviewId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    return res
      .status(404)
      .json({ message: `No cast review with id: ${reviewId}` });
  }

  const deletedCastReview = await CastReview.findByIdAndRemove(reviewId);
  res
    .status(200)
    .json({ message: "Cast Review deleted successfully", deletedCastReview });
};

export const updateCastReviewbyId = async (req, res) => {
  console.log(`PATCH: updateCastReviewbyId`);

  const { userId: authorId, reviewId } = req.params;

  const { personId, content, rating, createDate } = req.body;

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    return res
      .status(404)
      .json({ message: `No cast review with id: ${reviewId}` });
  }

  const updatedCastReview = {
    _id: reviewId,
    authorId,
    personId,
    content,
    rating,
    createDate,
  };

  const castReviewUpdated = await CastReview.findByIdAndUpdate(
    reviewId,
    updatedCastReview,
    {
      new: true,
    }
  );

  res.status(200).json(castReviewUpdated);
};
