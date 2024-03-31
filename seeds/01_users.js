/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex("users").del();
    await knex("users").insert([
      {
        id: 1,
        user_name: "ghufran",
        email: "ghufran@memory.lane",
        password_hash: "$2b$10$rjIj0BON..bhhmtUHyJd/e2tzlD9BACwRPKqMtIJRKbLUF9HUHwEq",
      },
    ]);
  };