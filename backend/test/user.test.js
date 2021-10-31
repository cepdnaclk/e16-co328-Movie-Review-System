import chai from "chai";
import chaiHttp from "chai-http";

import server from "../index.js";

const expect = chai.expect;
const should = chai.should();

chai.use(chaiHttp);

var token = "";
var userId = "";

describe("/Users routes Test", () => {
  /**
   * Testing API Welcome route
   */
  describe("/Test GET Welcome route", () => {
    it("Welcome route is accessed successfully", (done) => {
      chai
        .request(server)
        .get("/")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          const actualMsg = response.body.message;
          expect(actualMsg).to.be.equal("Welcome to the Movie-Review API!");
          done();
        });
    });
  });

  /**
   * Testing POST User SignUp
   */

  describe("/Test POST: Users SignUp", () => {
    it("User is able to sign up by providing valid input values", (done) => {
      let user = {
        firstName: process.env.USER_TEST_FNAME,
        lastName: process.env.USER_TEST_LNAME,
        email: process.env.USER_TEST_EMAIL,
        password: process.env.USER_TEST_PASSWORD,
      };

      chai
        .request(server)
        .post("/users/signup")
        .send(user)
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a("object");
          done();
        });
    });
  });

  /**
   * Testing POST User SignIn
   */

  describe("/Test POST: Users SignIn", () => {
    it("User is able to sign in by providing valid email and password", (done) => {
      let login_details = {
        email: process.env.USER_TEST_EMAIL,
        password: process.env.USER_TEST_PASSWORD,
      };

      chai
        .request(server)
        .post("/users/signin")
        .send(login_details)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("token");
          token = response.body.token;
          userId = response.body.result._id;
          done();
        });
    });

    it("User is not able to sign in by providing invalid email and password", (done) => {
      let login_details = {
        email: process.env.USER_TEST_EMAIL,
        password: process.env.USER_TEST_WRONGPASSWORD,
      };

      chai
        .request(server)
        .post("/users/signin")
        .send(login_details)
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          const actualMsg = response.body.message;
          expect(actualMsg).to.be.equal("Inavalid credentials");
          done();
        });
    });

    it("Already Registered User is able to sign in by providing valid email and password", (done) => {
      let login_details = {
        email: process.env.OLD_USER_EMAIL,
        password: process.env.OLD_USER_PASSWORD,
      };

      chai
        .request(server)
        .post("/users/signin")
        .send(login_details)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("token");
          process.env.USER_TOKEN = response.body.token;
          process.env.USER_ID = response.body.result._id;
          done();
        });
    });
  });

  /**
   * Testing GET Users
   */

  describe("/Test GET: Users", () => {
    it("All registered users are able to be fetched", (done) => {
      chai
        .request(server)
        .get("/users/")
        .set({
          Authorization: `Bearer ${token}`,
        })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          response.body.length.should.be.eql(2);
          done();
        });
    });
  });

  /**
   * Testing UPDATE User
   */

  describe("/Test UPDATE: Users", () => {
    it("User provide unmatching old and new passwords. Successfully update his/her password", (done) => {
      let update_user = {
        firstName: process.env.USER_TEST_FNAME,
        lastName: process.env.USER_TEST_LNAME,
        email: process.env.USER_TEST_EMAIL,
        oldPassword: process.env.USER_TEST_PASSWORD,
        newPassword: process.env.USER_TEST_NEWPASSWORD,
      };

      chai
        .request(server)
        .patch(`/users/${userId}`)
        .set({
          Authorization: `Bearer ${token}`,
        })
        .send(update_user)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          const actualMsg = response.body.resMsg.message;
          expect(actualMsg).to.be.equal("User updated successfully");
          done();
        });
    });

    it("User not provide matching old and new passwords. Update is unsuccessful. ", (done) => {
      let update_user = {
        firstName: process.env.USER_TEST_FNAME,
        lastName: process.env.USER_TEST_LNAME,
        email: process.env.USER_TEST_EMAIL,
        oldPassword: process.env.USER_TEST_PASSWORD,
        newPassword: process.env.USER_TEST_PASSWORD,
      };

      chai
        .request(server)
        .patch(`/users/${userId}`)
        .set({
          Authorization: `Bearer ${token}`,
        })
        .send(update_user)
        .end((err, response) => {
          response.should.have.status(400);
          response.body.should.be.a("object");
          const actualMsg = response.body.message;
          expect(actualMsg).to.be.equal("Inavalid credentials");
          done();
        });
    });
  });

  /**
   * Testing DELETE User
   */

  describe("/Test DELETE: Users", () => {
    it("User is a registered user. Delete user successfull.", (done) => {
      chai
        .request(server)
        .delete(`/users/${userId}`)
        .set({
          Authorization: `Bearer ${token}`,
        })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          const actualMsg = response.body.message;
          expect(actualMsg).to.be.equal("User deleted successfully");
          done();
        });
    });

    it("User is a unregistered user. Delete user unsuccessfull.", (done) => {
      chai
        .request(server)
        .delete(`/users/${process.env.USER_ID_INVALID}`)
        .set({
          Authorization: `Bearer ${token}`,
        })
        .end((err, response) => {
          response.should.have.status(404);
          response.body.should.be.a("object");
          const actualMsg = response.body.message;
          expect(actualMsg).to.be.equal(
            `No user with id: ${process.env.USER_ID_INVALID}`
          );
          done();
        });
    });
  });
});
