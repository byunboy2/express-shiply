"use strict";

// let {shipProduct} = require("../shipItApi");
// shipProduct = jest.fn();

// TODO: Why can't I do it like above??
// --> well, we def can't do it like this...

// to be put at top of test fn
// shipProduct.mockReturnValue(42)

const shipItApi = require("../shipItApi"); // <--- working ver
shipItApi.shipProduct = jest.fn(); // <--- working ver

const request = require("supertest");
const app = require("../app");

describe("POST /", function () {
  test("valid", async function () {

    //mock shipProduct
    shipItApi.shipProduct.mockReturnValue(42); // <---working ver
    // shipProduct.mockReturnValue(42)


    // per test preferable -- more granular
    // often you would .mockValueOnce() !

    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zipcode: "12345-6789",
    });

    expect(resp.body).toEqual({ shipped: 42 }); // <--- we hard-coded 42
    // we COULD be MORE specific above. it will DEFINITELY be 42
  });

  test("throws error if empty request body", async function () {

    //mock shipProduct
    // shipItApi.shipProduct.mockReturnValue(42);

    const resp = await request(app)
      .post("/shipments")
      .send();
    expect(resp.statusCode).toEqual(400);
  });

  test("returns JSON error if valid input is not provided", async function () {

    //mock shipProduct
    // shipItApi.shipProduct.mockReturnValue(42);

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
    expect(response.body.error.message.join(""))
      .toContain("productId", "name", "zipcode", "addr");
    // test to exactly the thing.

    // comment to see which field has incorrect formatting
    // check length of error, see if error msg includes field keyword
    // make 2 right, 2 wrong inputs, check that they are 2 length in msg
    //
  })
});
