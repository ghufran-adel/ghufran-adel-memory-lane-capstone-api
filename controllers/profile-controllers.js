const knex = require("knex")(require("../knexfile"));

// GET all profiles related to a user ID

const getProfilesByUserId = async (req, res) => {
  // get the id from the token
  const userId = req.decoded.id;

  try {
    const profiles = await knex("profile").where({ user_id: userId });

    // if (!profiles || profiles.length === 0) {
    //   return res
    //     .status(404)
    //     .json({ message: "No profiles found for the user" });
    // }

    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};

//   GET one profile related to the User ID

const getOneProfile = async (req, res) => {
  // get the id from the token
  const userId = req.decoded.id;

  const { profileID } = req.params;
  try {
    const profile = await knex("profile")
      .where({ user_id: userId })
      .where({ id: profileID });

    if (!profile) {
      return res.status(404).json({ message: "No profile found" });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};

// POST new profile to the user profiles

const addProfile = async (req, res) => {
  // get the id from the token
  const userId = req.decoded.id;
  try {
    // Check if the user ID exists in the database
    const userExists = await knex("users").where({ id: userId }).first();
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    // Extract profile data from the request body
    const { baby_name, baby_birthday } = req.body;

    // Insert the new profile into the database
    const result = await knex("profile").insert({
      user_id: userId,
      baby_name,
      baby_birthday,
    });

    // Check if the insertion was successful
    if (!result || result.length === 0) {
      return res.status(500).json({ message: "Failed to create profile" });
    }

    const newProfileId = result[0];

    // Fetch the newly created profile
    const createdProfile = await knex("profile")
      .where({ id: newProfileId })
      .first();

    res
      .status(201)
      .json({
        message: "Profile created successfully",
        profile: createdProfile,
      });
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};

module.exports = { getProfilesByUserId, getOneProfile, addProfile };
