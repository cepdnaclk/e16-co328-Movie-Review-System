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
   * Testing API welcome route
   */
  it("Test API Welcome route", (done) => {
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

  /**
   * Testing POST valid user route
   */
  it("Test POST User: SignUp", (done) => {
    let user = {
      firstName: "Dilshani",
      lastName: "Herath",
      email: "dilshani.herath@gmail.com",
      password: "dilshani@pw123",
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

  /**
   * Testing POST valid user signin route
   */
  it("Test POST User: SignIn", (done) => {
    let login_details = {
      email: "dilshani.herath@gmail.com",
      password: "dilshani@pw123",
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

  /**
   * Testing POST valid user signin route
   */
  it("Test POST Already available User: SignIn", (done) => {
    let login_details = {
      email: process.env.USER_EMAIL,
      password: process.env.USER_PASSWORD,
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

  /**
   * Testing POST invalid user signin route
   */
  it("Test POST User: Invalid Credentials SignIn", (done) => {
    let login_details = {
      email: "dilshani.herath@gmail.com",
      password: "neth@pw123",
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

  /**
   * Testing GET all Users route
   */
  it("Test GET Users: Verify we have 1 user initially", (done) => {
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

  /**
   * Testing UPDATE User route
   */
  it("Test UPDATE User", (done) => {
    let update_user = {
      firstName: "Dilshani",
      lastName: "Herath",
      email: "dilshani.herath@gmail.com",
      oldPassword: "dilshani@pw123",
      newPassword: "herath@pw123",
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

  /**
   * Testing UPDATE User route: Invalid update
   */
  it("Test Invalid UPDATE User: If user wants to update password, the old password should not matche new password ", (done) => {
    let update_user = {
      firstName: "Dilshani",
      lastName: "Herath",
      email: "dilshani.herath@gmail.com",
      oldPassword: "dilshani@pw123",
      newPassword: "dilshani@pw123",
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

  /**
   * Testing DELETE User route
   */
  it("Test DELETE User", (done) => {
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
});
