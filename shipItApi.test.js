"use strict";

const AxiosMockAdapter = require("axios-mock-adapter");
const axios = require("axios");
const axiosMock = new AxiosMockAdapter(axios);

const BASE_URL = "http://localhost:3001";



const {
  shipProduct,
} = require("./shipItApi");


test("shipProduct", async function () {
  // Mock axios requests
  axiosMock.onPost(`${BASE_URL}/ship`)
  .reply(200, { receipt: {shipId: 42} });


  const shipId = await shipProduct({
    productId: 1000,
    name: "Test Tester",
    addr: "100 Test St",
    zip: "12345-6789",
  });

  expect(shipId).toEqual(42);
});
