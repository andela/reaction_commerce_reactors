const expect = require("chai").expect;
const supertest = require("supertest");
const api = supertest("http://localhost:3030");


describe("Cart end point", () => {
  'use strict';
<<<<<<< 83a191ce4f2145987d9c0c4ad0ab0298ec696820

  let id;
  it("should respond with an array of carts", (done) => {
    api.get("/api/carts")
=======
  
  let id;
  it("should respond with an array of emails", (done) => {
    api.get("/api/emails")
>>>>>>> feature: Add tests for Email and Cart
    .set("x-shop-id", "J8Bhq3uTtdgwZx3rz")
    .set("x-user-id", "K54okcMXiPvuzrFeg")
    .set("Accept", "application/json")
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(Array.isArray(res.body)).to.equal(true);
      done();
    });
  });

<<<<<<< 83a191ce4f2145987d9c0c4ad0ab0298ec696820
  it("create a new cart", (done) => {
    api.post("/api/carts")
    .set("Accept", "application/json")
    .send({
      sessionId: "Tbgv568grEG78b",
      email: "admin@host.com",
      items: ["Gold", "Gucci"],
      tax: 67
=======
  it("create a new email", (done) => {
    api.post("/api/emails")
    .set("Accept", "application/json")
    .send({
      to: "anemai@lhost.com",
      from: "another@host.com",
      subject: "the subject",
      text: "text part of the email",
      html: "<h1>still a text fields<h1>",
      jobId: "2rDBGETYUwr77nn",
      status: "Delieverd"
>>>>>>> feature: Add tests for Email and Cart
    })
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(typeof(res.body)).to.equal("object");
      id = res.body._id;
      done();
    });
  });

<<<<<<< 83a191ce4f2145987d9c0c4ad0ab0298ec696820
  it("should get a single cart", (done) => {
    api.get("/api/carts/" + id)
=======
  it("should get a single email", (done) => {
    api.get("/api/emails/"+id)
>>>>>>> feature: Add tests for Email and Cart
    .set("x-shop-id", "J8Bhq3uTtdgwZx3rz")
    .set("x-user-id", "K54okcMXiPvuzrFeg")
    .set("Accept", "application/json")
    .end((err, res) => {
<<<<<<< 83a191ce4f2145987d9c0c4ad0ab0298ec696820
=======
      console.log("in");
>>>>>>> feature: Add tests for Email and Cart
      expect(res.status).to.equal(200);
      expect(typeof(res.body)).to.equal('object');
      expect(res.body._id).to.equal(id);
      done();
    });
  });

<<<<<<< 83a191ce4f2145987d9c0c4ad0ab0298ec696820
  it("should update a cart", (done) => {
    api.put("/api/carts/")
=======
  it("should update an email", (done) => {
    api.put("/api/emails/"+id)
>>>>>>> feature: Add tests for Email and Cart
    .set("x-shop-id", "J8Bhq3uTtdgwZx3rz")
    .set("x-user-id", "K54okcMXiPvuzrFeg")
    .set("Accept", "application/json")
    .send({
<<<<<<< 83a191ce4f2145987d9c0c4ad0ab0298ec696820
      tax: 50
    })
    .end((err, res) => {
=======
      text: "an updated Email text"
    })
    .end((err, res) => {
      console.log(id);
>>>>>>> feature: Add tests for Email and Cart
      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal("updated successfully");
      done();
    });
  });

<<<<<<< 83a191ce4f2145987d9c0c4ad0ab0298ec696820
  it("should delete cart", (done) => {
    api.delete("/api/carts/"+id)
=======
  it("should delete an email", (done) => {
    api.delete("/api/emails/"+id)
>>>>>>> feature: Add tests for Email and Cart
    .set("x-shop-id", "J8Bhq3uTtdgwZx3rz")
    .set("x-user-id", "K54okcMXiPvuzrFeg")
    .set("Accept", "application/json")
    .end((err, res) => {
    expect(res.status).to.equal(200);
<<<<<<< 83a191ce4f2145987d9c0c4ad0ab0298ec696820
    expect(res.body.message).to.equal("Cart deleted successfully");
=======
    expect(res.body.message).to.equal("Email deleted successfully");
>>>>>>> feature: Add tests for Email and Cart
      done();
    });
  });

});
