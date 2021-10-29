import mongoose from "mongoose";

const castReviewSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  authorId: {
    type: String,
    required: true,
  },
  personId: {
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

export default mongoose.model("CastReview", castReviewSchema);
