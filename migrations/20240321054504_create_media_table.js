/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  // Define the schema for Media table
  return knex.schema.createTable("media", (table) => {
    table.increments("id").primary();
    table
    .integer('milestone_id')
    .unsigned()
    .references('milestones.id')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');
    table.enum("media_type", ["image", "video", "audio"]).notNullable();
    table.string("media_url");
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
    return knex.schema.dropTable("media");
};
