/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("milestones", (table) => {
    table.increments("id").primary();
    table
    .integer('profile_id')
    .unsigned()
    .references('profile.id')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');
    table.string("title").notNullable();
    table.timestamp("date").notNullable();
    table.text("description").notNullable();
    table.decimal("latitude", 9, 6);
    table.decimal("longitude", 9, 6);
    table.string("address").notNullable();
    table.string("people");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("milestones");
};
