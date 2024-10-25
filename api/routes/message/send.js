// /api/routes/messages/send.js

const { client } = require("../../../db/connection");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");

const SECRET_KEY = "boas"; // Same secret key used for JWT

const sendMessage = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Expect "Bearer <token>"
    if (!token) {
      return res.status(401).json({ message: "Authorization token required" });
    }

    // Verify and decode the JWT token
    const decoded = jwt.verify(token, SECRET_KEY);

    // Extract the chat room ID and message from the request body
    const { chatRoomId, text } = req.body;
    const senderId = decoded.id; // Extract sender's ID from the decoded token
    
    if (!chatRoomId || !text) {
      return res.status(400).json({ message: "Chat room ID and message text are required" });
    }

    // Create a message object
    const message = {
      chatRoomId: new ObjectId(chatRoomId),
      senderId: new ObjectId(senderId),
      text,
      createdAt: new Date(),
    };

    // Insert the message into the database
    const result = await client.db("RC").collection("messages").insertOne(message);

    if (result.insertedId) {
      return res.status(200).json({ message: "Message sent successfully" });
    } else {
      return res.status(500).json({ message: "Failed to send message" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = sendMessage;
