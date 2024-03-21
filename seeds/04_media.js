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
            media_url: 'https://example.com/image1.jpg',
          },
          { 
            id:2,
            milestone_id: 2,
            media_type: 'video',
            media_url: 'https://example.com/video1.mp4',
          }
    ]);
  };