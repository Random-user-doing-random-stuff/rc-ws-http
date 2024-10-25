const { client } = require("../../../db/connection");
const User = require("../../../db/schemas/user"); // assuming User is a schema/model

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Input validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new user object
    const newUser = {
      name,
      email,
      password, // Ensure password is hashed before saving
    };

    // Insert the new user into the database
    const result = await client
      .db("RC")
      .collection("users")
      .insertOne(newUser);

    if (result.insertedId) {
      console.log("User registered successfully");
      return res.sendStatus(200); // return to prevent further code execution
    } else {
      console.log(result)
      return res.status(500).json({ message: "Failed to register user" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = register;
