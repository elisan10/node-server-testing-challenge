const server = require("./server");
const db = require("../data/dbConfig");
const request = require("supertest");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db("gospel").truncate();
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe("[post]/gospel", () => {
  it("test run", () => {
    expect(true).toBe(true);
  });

  it("responds with a new book", async () => {
    const res = await request(server).post("/gospel").send({
      book: "john",
    });
    expect(res.body).toMatchObject({ id: 4, book: "john" });
  });
});

describe("[DELETE]/gospel/:id", () => {
  it("responds with a deleted book", async () => {
    const res = await request(server)
      .delete("/gospel/4")
      .then({ id: 4, book: "john" });
    expect(res.status).toBe(200);
  });
});
