const request = require("supertest");

const app = require("../src/app");

describe("GET /api/v1", () => {
  it("responds with a json message", function(done) {
    request(app)
      .get("/api/v1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(
        200,
        {
          message: "API - 👋🌎🌍🌏"
        },
        done
      );
  });
});

describe("POST /api/v1/post/search", () => {
  it("responds with a json message and given input", function(done) {
    request(app)
      .post("/api/v1/post/search")
      .send({ input: "SUPERTEST" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, { message: "👋🌎🌍🌏 from search API!", yourinput: "SUPERTEST" }, done);
  });
});

describe("GET /api/v1/get/from", () => {
  it("responds with a json message", function(done) {
    request(app)
      .get("/api/v1/get/from")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(
        200,
        {
          message: "👋🌎🌍🌏 from get API! You getting something from the database!"
        },
        done
      );
  });
});
