/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex("media").del();
    await knex("media").insert([
        { 
            id:1,
            milestone_id: 1,
            media_type: 'image',
            media_url: '/uploads/Baby-walking-1.jpg',
          },
          { 
            id:2,
            milestone_id: 1,
            media_type: 'image',
            media_url: '/uploads/Baby-walking-3.jpg',
          },
          { 
            id:3,
            milestone_id: 1,
            media_type: 'image',
            media_url: '/uploads/Baby-walking-2.jpg',
          },
          { 
            id:4,
            milestone_id: 2,
            media_type: 'image',
            media_url: '/uploads/baby-frist-tooth.jpg',
          }
    ]);
  };