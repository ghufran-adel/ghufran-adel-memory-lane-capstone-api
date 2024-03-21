/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex("profile").del();
    await knex("profile").insert([
      {
        id: 1,
        user_id:1,
        baby_name: "rayan",
        baby_birthday: "2023-03-10",
      },
      {
        id: 2,
        user_id:2,
        baby_name: "farah",
        baby_birthday: "2022-01-10",
      },
    ]);
  };