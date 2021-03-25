exports.up = function (knex) {
  return knex.schema.createTable("gospel", (tbl) => {
    tbl.increments();
    tbl.string("book", 255).unique().notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("gospel");
};
