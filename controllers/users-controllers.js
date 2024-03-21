const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcrypt");

// GET users list
const getUsers = async (_req, res) => {
  try {
    const data = await knex("users");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Error retrieving users: ${error}`);
  }
};

// controller to add a new inventory item
const addNewUser = async (req, res) => {
  const { user_name, email, password } = req.body;

  // Generate a salt and hash the password
  const hashPassword = await bcrypt.hash(password, 10);

  // insert a user data entry to database
  try {
    const result = await knex("users").insert({
      user_name,
      email,
      password_hash: hashPassword,
    });

    const newUserId = result[0];
    const createdUser = await knex("users").where({
      id: newUserId,
    });

    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new user: ${error}`,
    });
  }
};

module.exports = { getUsers, addNewUser };
