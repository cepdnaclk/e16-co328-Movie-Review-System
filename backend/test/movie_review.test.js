import chai from "chai";
import chaiHttp from "chai-http";

import server from "../index.js";

const expect = chai.expect;
const should = chai.should();

chai.use(chaiHttp);

var reviewId = "";

describe("/Movie Review routes Test", () => {
  /**
   * Testing POST Movie Review
   */

  describe("/Test POST: Movie Review", () => {
    it("User provides valid input values to post a movie review.", (done) => {
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
  });

  /**
   * Testing GET Movie Reviews
   */

  describe("/Test GET: All Movie Reviews", () => {
    it("Movie reviews related to a specific movie are able to be fetched separately. We get only 1 Movie Review", (done) => {
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

    it("Movie reviews posted by a specific user are able to be fetched separately. We get only 1 Movie Review", (done) => {
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
  });

  /**
   * Testing GET Movie Review
   */

  describe("/Test GET: A Movie Review", () => {
    it("A specific Movie review posted by a specific user are able to be fetched separately. We get only 1 Movie Review", (done) => {
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
  });

  /**
   * Testing UPDATE Movie Review
   */

  describe("/Test UPDATE: A Movie Review", () => {
    it("A specific Movie review posted by a specific user is able to be updated separately.", (done) => {
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

    it("An unavailable Movie review is not able to be updated.", (done) => {
      let update_movie_review = {
        movieId: process.env.MOVIE_ID,
        content: "Awesome movie.",
        rating: 3,
      };

      chai
        .request(server)
        .patch(
          `/movie-review/${process.env.USER_ID}/${process.env.INVALID_MOVIE_REVIEW_ID}`
        )
        .set({
          Authorization: `Bearer ${process.env.USER_TOKEN}`,
        })
        .send(update_movie_review)
        .end((err, response) => {
          response.should.have.status(404);
          response.body.should.be.a("object");
          const actualMsg = response.body.message;
          expect(actualMsg).to.be.equal(
            `No review with id: ${process.env.INVALID_MOVIE_REVIEW_ID}`
          );
          done();
        });
    });
  });

  /**
   * Testing DELETE Movie Review
   */
  describe("/Test DELETE: A Movie Review", () => {
    it("An available Movie review is able to be deleted", (done) => {
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
});
