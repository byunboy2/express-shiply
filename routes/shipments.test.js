"use strict";

const request = require("supertest");
const app = require("../app");


describe("POST /", function () {
  test("valid", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zipcode: "12345-6789",
    });

    expect(resp.body).toEqual({ shipped: expect.any(Number) });
  });

  test("throws error if empty request body", async function () {
    const resp = await request(app)
      .post("/shipments")
      .send();
    expect(resp.statusCode).toEqual(400);
  });

  test("returns JSON error if valid input is not provided", async function () {
    const response = await request(app)
      .post("/shipments")
      .send({
        productId: "test",
        name: 123,
        addr: 123,
        zipcode: 123,
      });
    expect(response.statusCode).toEqual(400);
    expect(response.body.error.message.length).toEqual(4);
    expect(response.body.error.message.join("")).toContain("productId","name","zipcode","addr");
      // comment to see which field has incorrect formatting
      // check length of error, see if error msg includes field keyword
      // make 2 right, 2 wrong inputs, check that they are 2 length in msg
      //
  })
});
