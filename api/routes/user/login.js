const { client } = require("../../../db/connection");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "boas";
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const query = { email };
    const user = await client.db("RC").collection("users").findOne(query);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const user_jwt = {
      id: user._id,
      name: user.name,
    }
    // If everything is good, send a success message
    const token = jwt.sign(user_jwt, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = login;
