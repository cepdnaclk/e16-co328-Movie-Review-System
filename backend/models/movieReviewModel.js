import mongoose from "mongoose";

const movieReviewSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  authorId: {
    type: String,
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  createDate: {
    type: Date,
    default: new Date(),
    required: true,
  },
});

export default mongoose.model("MovieReview", movieReviewSchema);
