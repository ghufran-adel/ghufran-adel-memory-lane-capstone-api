const knex = require("knex")(require("../knexfile"));

// GET all profiles related to a user ID

const getProfilesByUserId = async (req, res) => {
  // get the id from the token
  const userId = req.decoded.id;

  try {
    const profiles = await knex("profile").where({ user_id: userId });

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
      avatar_url: req.file
        ? `uploads/${req.file.filename}`
        : `images/defult-profile.jpg`,
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

    res.status(201).json({
      message: "Profile created successfully",
      profile: createdProfile,
    });
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};

//   DELETE one profile related to the User ID

const deleteProfile = async (req, res) => {
  console.log("hi");
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

    const Deletedprofile = await knex("profile")
      .where({ id: profileID })
      .delete();
    // No Content response
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};

// UPDATE profile

const updateProfile = async (req, res) => {
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

    // Extract profile data from the request body
    const { baby_name, baby_birthday } = req.body;

    // update profile in database
    const result = await knex("profile")
      .where({ id: profileID })
      .update({
        user_id: userId,
        baby_name,
        baby_birthday: new Date(baby_birthday),
        avatar_url: req.file
          ? `uploads/${req.file.filename}`
          : `images/defult-profile.jpg`,
        updated_at: new Date(),
      });

    res.status(200).json({
      message: "Profile updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};

module.exports = {
  getProfilesByUserId,
  getOneProfile,
  addProfile,
  deleteProfile,
  updateProfile,
};
