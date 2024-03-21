/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex("milestones").del();
    await knex("milestones").insert([
        { 
            id:1,
            profile_id: 1,
            title: 'First Steps',
            date: '2024-03-15',
            description: 'Baby took their first steps!',
            latitude: 37.7749,
            longitude: -122.4194,
            address: '123 Main St, City, Country',
          },
          { 
            id:2,
            profile_id: 1,
            title: 'First Tooth',
            date: '2024-04-10',
            description: 'Baby\'s first tooth appeared!',
            latitude: 34.0522,
            longitude: -118.2437,
            address: '456 Elm St, City, Country',
          }
    ]);
  };