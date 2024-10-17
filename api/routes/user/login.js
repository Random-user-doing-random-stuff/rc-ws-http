const { client } = require("../../../db/connection");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic input validation
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const query = { email };
    const user = await client.db("RC").collection("users").findOne(query);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // For now, not using bcrypt, just checking if the provided password matches exactly
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // If everything is good, send a success message
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = login;
