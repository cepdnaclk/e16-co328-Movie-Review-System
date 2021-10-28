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

export const getReviewbyUserId = async (req, res) => {
  console.log(`GET: getReviewbyUserId`);

  const { id } = req.params;
  try {
    const movieReviews = await MovieReview.find({ authorId: id });
    res.status(200).json(movieReviews);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


