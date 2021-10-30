import chai from "chai";
import chaiHttp from "chai-http";

import server from "../index.js";

const expect = chai.expect;
const should = chai.should();

chai.use(chaiHttp);

var castReviewId = "";

describe("/Cast Review routes Test", () => {
  /**
   * Testing POST valid Cast Review route
   */
  it("Test POST Cast Review: Creating a valid Cast Review", (done) => {
    let cast_review = {
      authorId: process.env.USER_ID,
      content: "The best actor I've ever seen",
      rating: 4,
    };

    chai
      .request(server)
      .post(`/cast-review/${process.env.PERSON_ID}`)
      .set({
        Authorization: `Bearer ${process.env.USER_TOKEN}`,
      })
      .send(cast_review)
      .end((err, response) => {
        response.should.have.status(201);
        response.body.should.be.a("object");
        castReviewId = response.body._id;
        done();
      });
  });

  /**
   * Testing GET all Cast reviews by personId route
   */
  it("Test GET Cast Reviews by personId: Verify we have 1 cast review initially", (done) => {
    chai
      .request(server)
      .get(`/cast-review/${process.env.PERSON_ID}`)
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
   * Testing GET all Cast reviews by userId route
   */
  it("Test GET Cast Reviews by userId: Verify we have 1 cast review initially", (done) => {
    chai
      .request(server)
      .get(`/cast-review/${process.env.USER_ID}/list`)
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
   * Testing GET Cast review by userId and castReviewId route
   */
  it("Test GET Cast Review by userId and castReviewId: Verify we only get 1 cast review", (done) => {
    chai
      .request(server)
      .get(`/cast-review/${process.env.USER_ID}/${castReviewId}`)
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
   * Testing UPDATE Cast review by castReviewId route
   */
  it("Test UPDATE Cast review by castReviewId", (done) => {
    let update_cast_review = {
      personId: process.env.PERSON_ID,
      content: "Leonardo DiCaprio is a Fantastic actor.",
      rating: 5,
    };

    chai
      .request(server)
      .patch(`/cast-review/${process.env.USER_ID}/${castReviewId}`)
      .set({
        Authorization: `Bearer ${process.env.USER_TOKEN}`,
      })
      .send(update_cast_review)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        done();
      });
  });

  /**
   * Testing UPDATE Cast review by invalid castReviewId route
   */
  it("Test UPDATE Cast review by invalid castReviewId", (done) => {
    let update_cast_review = {
      personId: process.env.PERSON_ID,
      content: "Awesome actor.",
      rating: 3,
    };

    chai
      .request(server)
      .patch(`/cast-review/${process.env.USER_ID}/456`)
      .set({
        Authorization: `Bearer ${process.env.USER_TOKEN}`,
      })
      .send(update_cast_review)
      .end((err, response) => {
        response.should.have.status(404);
        response.body.should.be.a("object");
        const actualMsg = response.body.message;
        expect(actualMsg).to.be.equal("No cast review with id: 456");
        done();
      });
  });

  /**
   * Testing DELETE Cast review by castReviewId route
   */
  it("Test DELETE Cast review by castReviewId", (done) => {
    chai
      .request(server)
      .delete(`/cast-review/${process.env.USER_ID}/${castReviewId}`)
      .set({
        Authorization: `Bearer ${process.env.USER_TOKEN}`,
      })
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        const actualMsg = response.body.message;
        expect(actualMsg).to.be.equal("Cast Review deleted successfully");
        done();
      });
  });
});
