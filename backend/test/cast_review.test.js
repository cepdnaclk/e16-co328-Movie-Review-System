import chai from "chai";
import chaiHttp from "chai-http";

import server from "../index.js";

const expect = chai.expect;
const should = chai.should();

chai.use(chaiHttp);

var castReviewId = "";

describe("/Cast Review routes Test", () => {
  /**
   * Testing POST Cast Review
   */
  describe("/Test POST: Cast reviews", () => {
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
  });

  /**
   * Testing GET Cast Reviews
   */
  describe("/Test GET: All Movie Reviews", () => {
    it("Cast reviews related to a specific person are able to be fetched separately. We get only 1 Cast Review", (done) => {
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

    it("Cast reviews posted by a specific user are able to be fetched separately. We get only 1 Cast Review", (done) => {
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
  });

  /**
   * Testing GET Cast Review
   */

  describe("/Test GET: A Cast Review", () => {
    it("A specific Cast review posted by a specific user are able to be fetched separately. We get only 1 Cast Review", (done) => {
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
  });

  /**
   * Testing UPDATE Cast Review
   */
  describe("/Test UPDATE: A Cast Review", () => {
    it("A specific Cast review posted by a specific user is able to be updated separately.", (done) => {
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

    it("An unavailable Cast review is not able to be updated.", (done) => {
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
  });

  /**
   * Testing DELETE Cast Review
   */

  describe("/Test DELETE: A Cast Review", () => {
    it("An available Cast review is able to be deleted", (done) => {
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
});
