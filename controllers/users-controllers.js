const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcrypt");

const secretKey = process.env.SECRET_KEY; //check where it should loacted 

const jwt = require("jsonwebtoken");

// GET users list
const getUsers = async (_req, res) => {
  try {
    const data = await knex("users");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Error retrieving users: ${error}`);
  }
};



// controller to add a new user
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

// controller to login and got the token
const logIn = async (req, res) => {
  try {
      const { email, password } = req.body;

      // get all users from db and check if exisit
      const userData = await knex("users").where({email: email}).first();
      if (!userData) {
          return res.status(404).json({ error: "User not found" });
      }

      // check password is correct 
      const comparePassword = await bcrypt.compare(password, userData.password_hash);
      if (!comparePassword) {
          return res.status(401).json({ error: "Invalid password" });
      }
      
      // create the token
      let token= jwt.sign ({ userName: userData.user_name },secretKey);

      res.status(200).json({token});
  } catch (error) {
      res.status(401).send(`Couldn't log you in, check email and password.`);
  }
};


module.exports = { getUsers, addNewUser , logIn};
