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
        baby_birthday: new Date(1678435200000),
        avatar_url: "/uploads/profile_two.jpg"
      },
      {
        id: 2,
        user_id:1,
        baby_name: "farah",
        baby_birthday: new Date(1678435200000),
        avatar_url: "/uploads/profile_one.jpg"
      },
    ]);
  };