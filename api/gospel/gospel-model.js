const db = require("../../data/dbConfig");

function getById(id) {
  return db("gospel").where("id", id).first();
}

async function insert(book) {
  const [id] = await db("gospel").insert(book);
  return getById(id);
}

async function remove(id) {
  return await db("gospel").where("id", id).del();
}

module.exports = {
  getById,
  insert,
  remove,
};
