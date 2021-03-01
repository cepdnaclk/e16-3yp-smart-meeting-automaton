process.env.NODE_ENV = "test";

const expect = require("chai").expect;
const request = require("supertest");

const user = require("../Route/user");
const server = require("../Server");

describe("User API", () => {
  it("Can register a new coordinator", (done) => {
    request(server)
      .post("/admin/adduser")
      .send({
        username: "newUser2",
        password: "12345678",
        email: "user2@gmail.com",
      })
      .then((res) => {
        const body = res.body;
        expect(res.status).to.be.equal(200);
        expect(body).to.contain.property("_id");
        expect(body).to.contain.property("username");
        expect(body).to.contain.property("password");
        expect(body).to.contain.property("email");
        expect(body.username).to.be.equal("newUser2");
        expect(body.email).to.be.equal("user2@gmail.com");

        done();
      })
      .catch((err) => done(err));
  }).timeout(30000);

  it("Can not register a new coordinator", (done) => {
    request(server)
      .post("/admin/adduser")
      .send({
        username: "newUser2",
        password: "12345678",
        email: "user2@gmail.com",
      })
      .then((res) => {
        const body = res.body;
        expect(res.status).to.be.equal(400);
        expect(body.message).to.be.equal("email already exist");
        done();
      })
      .catch((err) => done(err));
  }).timeout(30000);
});
