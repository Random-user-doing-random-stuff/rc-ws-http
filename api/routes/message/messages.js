const { ObjectId } = require("mongodb");
const { client } = require("../../../db/connection");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "boas"; // Same secret key used for JWT

const getMessages = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Expect "Bearer <token>"
        if (!token) {
          return res.status(401).json({ message: "Authorization token required" });
        }
        const decoded = jwt.verify(token, SECRET_KEY);
        const chatId = req.params.chatId;

        // Access the messages collection
        console.log(chatId);
        const messages = await client.db("RC").collection("messages").find({ chatRoomId: new ObjectId(chatId), senderId: new ObjectId(decoded.id) }).toArray();

        // Send the fetched messages as a response
        res.status(200).json(messages);
    } catch (error) {
        console.error(error);

        // Send an error response if an exception occurs
        res.status(500).json({
            error: "An error occurred while fetching messages",
        });
    }
};

module.exports = getMessages;
