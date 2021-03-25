const Gospel = require("./gospel-model");
const db = require("../../data/dbConfig");

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

describe("getById", () => {
  it("test run", () => {
    expect(true).toBe(true);
  });
  it("can get book by id", async () => {
    const matthew = await Gospel.getById(1);
    expect(matthew).toMatchObject({ id: 1, book: "matthew" });
  });
});

describe("insert", () => {
  it("can add a new book into database", async () => {
    const john = { book: "john" };

    await Gospel.insert(john);

    expect(await db("gospel")).toHaveLength(4);
    const john2 = await db("gospel").where({ id: 4 }).first();
    expect(john2).toMatchObject({ id: 4, book: "john" });
  });

  it("shows that there was a new book added", async () => {
    const john = { book: "john" };
    const result = await Gospel.insert(john);
    expect(result).toMatchObject({ id: 4, book: "john" });
  });
});

describe("remove", () => {
  it("can remove book from database", async () => {
    const john = { book: "john" };
    await Gospel.remove(john);

    expect(await db("gospel")).toHaveLength(3);
    const noJohn = await db("gospel").where({ id: 4, book: "john" });
    expect(noJohn).not.toMatchObject({ id: 4, book: "john" });
  });
  it("resolves in no object that has book of john", async () => {
    // const john = { id: 4, book: "john" };
    const noJohn = await db("gospel").where({ id: 4, book: "john" });
    await Gospel.remove(noJohn);
    expect(noJohn).not.toMatchObject({ id: 4, book: "john" });
  });
});
