exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("gospel")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("gospel").insert([
        { book: "matthew" },
        { book: "mark" },
        { book: "luke" },
      ]);
    });
};
