import chai from "chai";
import chaiHttp from "chai-http";

import server from "../index.js";

const expect = chai.expect;
const should = chai.should();

chai.use(chaiHttp);

var reviewId = "";

describe("/Movie Review routes Test", () => {
  /**
   * Testing POST valid Movie Review route
   */
  it("Test POST Movie Review: Creating a valid Movie Review", (done) => {
    let movie_review = {
      authorId: process.env.USER_ID,
      content: "Hands down the best science fiction movie I've ever watched.",
      rating: 4,
    };

    chai
      .request(server)
      .post(`/movie-review/${process.env.MOVIE_ID}`)
      .set({
        Authorization: `Bearer ${process.env.USER_TOKEN}`,
      })
      .send(movie_review)
      .end((err, response) => {
        response.should.have.status(201);
        response.body.should.be.a("object");
        reviewId = response.body._id;
        done();
      });
  });

  /**
   * Testing GET all Movie reviews by movieId route
   */
  it("Test GET Movie Reviews by movieId: Verify we have 1 movie review initially", (done) => {
    chai
      .request(server)
      .get(`/movie-review/${process.env.MOVIE_ID}`)
      .set({
        Authorization: `Bearer ${process.env.USER_TOKEN}`,
      })
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("array");
        response.body.length.should.be.eql(1);
        done();
      });
  });

  /**
   * Testing GET all Movie reviews by userId route
   */
  it("Test GET Movie Reviews by userId: Verify we have 1 movie review initially", (done) => {
    chai
      .request(server)
      .get(`/movie-review/${process.env.USER_ID}/list`)
      .set({
        Authorization: `Bearer ${process.env.USER_TOKEN}`,
      })
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("array");
        response.body.length.should.be.eql(1);
        done();
      });
  });

  /**
   * Testing GET Movie review by userId and reviewId route
   */
  it("Test GET Movie Review by userId and reviewId: Verify we only get 1 movie review", (done) => {
    chai
      .request(server)
      .get(`/movie-review/${process.env.USER_ID}/${reviewId}`)
      .set({
        Authorization: `Bearer ${process.env.USER_TOKEN}`,
      })
      .end((err, response) => {
        response.should.have.status(200);
        //response.body.should.be.a("object");
        response.body.length.should.be.eql(1);
        done();
      });
  });

  /**
   * Testing UPDATE Movie review by reviewId route
   */
  it("Test UPDATE Movie review by reviewId", (done) => {
    let update_movie_review = {
      movieId: process.env.MOVIE_ID,
      content: "Best science fiction movie I've ever seen.",
      rating: 5,
    };

    chai
      .request(server)
      .patch(`/movie-review/${process.env.USER_ID}/${reviewId}`)
      .set({
        Authorization: `Bearer ${process.env.USER_TOKEN}`,
      })
      .send(update_movie_review)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        done();
      });
  });

  /**
   * Testing UPDATE Movie review by invalid reviewId route
   */
  it("Test UPDATE Movie review by invalid reviewId", (done) => {
    let update_movie_review = {
      movieId: process.env.MOVIE_ID,
      content: "Awesome movie.",
      rating: 3,
    };

    chai
      .request(server)
      .patch(`/movie-review/${process.env.USER_ID}/123`)
      .set({
        Authorization: `Bearer ${process.env.USER_TOKEN}`,
      })
      .send(update_movie_review)
      .end((err, response) => {
        response.should.have.status(404);
        response.body.should.be.a("object");
        const actualMsg = response.body.message;
        expect(actualMsg).to.be.equal("No review with id: 123");
        done();
      });
  });

  /**
   * Testing DELETE Movie review by reviewId route
   */
  it("Test DELETE Movie review by reviewId", (done) => {
    chai
      .request(server)
      .delete(`/movie-review/${process.env.USER_ID}/${reviewId}`)
      .set({
        Authorization: `Bearer ${process.env.USER_TOKEN}`,
      })
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        const actualMsg = response.body.message;
        expect(actualMsg).to.be.equal("Review deleted successfully");
        done();
      });
  });
});
