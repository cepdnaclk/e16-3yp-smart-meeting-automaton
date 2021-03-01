process.env.NODE_ENV = "test";

const expect = require("chai").expect;
const request = require("supertest");

const user = require("../Route/user");
const server = require("../Server");

describe("Add meeting rooms", () => {
  it("Can login successfully", (done) => {
    request(server)
      .post("/admin/addroom")
      .send({
        roomId: "SeminarRoom1",
        controlUnitId: "CUID2",
        meetingOwnerId: "e522",
        isReserved: true,
      })
      .then((res) => {
        const body = res.body;
        expect(res.status).to.be.equal(200);
        expect(body).to.contain.property("_id");
        expect(body).to.contain.property("roomId");
        expect(body).to.contain.property("controlUnitId");
        expect(body).to.contain.property("meetingOwnerId");
        expect(body).to.contain.property("isReserved");
        expect(body.roomId).to.be.equal("SeminarRoom1");
        expect(body.controlUnitId).to.contain.property("CUID2");
        expect(body.meetingOwnerId).to.be.equal("e522");
        expect(body.isReserved).to.be.equal(true);

        done();
      })
      .catch((err) => done(err));
  }).timeout(30000);

  it("Not available to add to the system", (done) => {
    request(server)
      .post("/admin/addroom")
      .send({
        roomId: "SeminarRoom1",
        controlUnitId: "CUID2",
        meetingOwnerId: "e522",
        isReserved: true,
      })
      .then((res) => {
        const body = res.body;
        expect(res.status).to.be.equal(200);
        expect(body.message).to.be.equal("Already exist...");
        done();
      })
      .catch((err) => done(err));
  }).timeout(30000);
});
