// /api/middleware/auth.js

const jwt = require("jsonwebtoken");
const SECRET_KEY = "boas";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Authorization token required" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = decoded; // Attach the decoded token (user info) to the request object
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = verifyToken;
