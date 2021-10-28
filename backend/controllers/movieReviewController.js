import mongoose from "mongoose";
import MovieReview from "../models/movieReviewModel.js";

export const createReview = async (req, res) => {
  console.log(`POST: createReview`);

  const { movieId } = req.params;

  const { authorId, content, rating, createDate } = req.body;

  const newReview = new MovieReview({
    _id: new mongoose.Types.ObjectId(),
    authorId,
    movieId,
    content,
    rating,
    createDate,
  });

  try {
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
  console.log(newReview);
};

export const getReviewbyMovieId = async (req, res) => {
  console.log(`GET: getReviewbyMovieId`);

  const { movieId: id } = req.params;
  try {
    const movieReviews = await MovieReview.find({ movieId: id });
    res.status(200).json(movieReviews);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllReviewbyUserId = async (req, res) => {
  console.log(`GET: getAllReviewbyUserId`);

  const { id } = req.params;
  try {
    const movieReviews = await MovieReview.find({ authorId: id });
    res.status(200).json(movieReviews);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getReviewbyUserId = async (req, res) => {
  console.log(`GET: getReviewbyUserId`);

  const { id, reviewId } = req.params;
  try {
    const movieReview = await MovieReview.find({ _id: reviewId, authorId: id });
    res.status(200).json(movieReview);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteReviewbyId = async (req, res) => {
  console.log(`DELETE: deleteReviewbyId`);

  const { reviewId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    return res.status(404).json({ message: `No review with id: ${reviewId}` });
  }

  const deletedReview = await MovieReview.findByIdAndRemove(reviewId);
  res
    .status(200)
    .json({ message: "Review deleted successfully", deletedReview });
};

export const updateReviewbyId = async (req, res) => {
  console.log(`PATCH: updateReviewbyId`);

  const { id: authorId, reviewId } = req.params;

  const { movieId, content, rating, createDate } = req.body;

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    return res.status(404).json({ message: `No review with id: ${reviewId}` });
  }

  const updatedReview = {
    _id: reviewId,
    authorId,
    movieId,
    content,
    rating,
    createDate,
  };

  const reviewUpdated = await MovieReview.findByIdAndUpdate(
    reviewId,
    updatedReview,
    {
      new: true,
    }
  );

  res.status(200).json(reviewUpdated);
};
