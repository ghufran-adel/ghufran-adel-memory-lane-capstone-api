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
        email: "ghufran@gmail.com",
        password_hash: "1234",
      },
      {
        id: 2,
        user_name: "ahmed",
        email: "ahmed@gmail.com",
        password_hash: "4321",
      },
    ]);
  };