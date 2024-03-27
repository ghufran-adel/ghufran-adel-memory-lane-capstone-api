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
        avatar_url: "https://i.pinimg.com/originals/3c/13/0c/3c130c683deca94f937948b85cacf7ec.jpg"
      },
      {
        id: 2,
        user_id:2,
        baby_name: "farah",
        baby_birthday: new Date(1678435200000),
        avatar_url: "https://images.unsplash.com/photo-1630305131239-c8df91783f10?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3V0ZSUyMGJhYnl8ZW58MHx8MHx8fDA%3D"
      },
    ]);
  };