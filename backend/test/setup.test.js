process.env.NODE_ENV = "test";

import User from "../models/userModel.js";
import MovieReview from "../models/movieReviewModel.js";
import CastReview from "../models/castReviewModel.js";

before((done) => {
  //User.deleteMany({}, (err) => {});
  MovieReview.deleteMany({}, (err) => {});
  CastReview.deleteMany({}, (err) => {});
  done();
});

after((done) => {
  //User.deleteMany({}, (err) => {});
  MovieReview.deleteMany({}, (err) => {});
  CastReview.deleteMany({}, (err) => {});
  done();
});
