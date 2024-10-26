const { ObjectId } = require("mongodb");
const { client } = require("../../../db/connection");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "boas"; // Same secret key used for JWT

const getUserMessages = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Expect "Bearer <token>"
        if (!token) {
            return res.status(401).json({ message: "Authorization token required" });
        }

        const decoded = jwt.verify(token, SECRET_KEY);
        const userId = decoded.id;

        // Fetch all messages where senderId or chatRoomId matches the userId
        const messages = await client.db("RC").collection("messages").find({
            $or: [
                { senderId: new ObjectId(userId) },
                { chatRoomId: new ObjectId(userId) }
            ]
        }).toArray();

        // Format the messages into the required chats structure
        const chats = {};
        
        messages.forEach(message => {
            const chatId = message.chatRoomId.toString();
            if (!chats[chatId]) {
                chats[chatId] = [];
            }
            chats[chatId].push({
                text: message.text,
                sender: message.senderId.toString() === userId ? userId : 'other'
            });
        });

        // Send the formatted chats as a response
        res.status(200).json(chats);
    } catch (error) {
        console.error(error);
        
        // Send an error response if an exception occurs
        res.status(500).json({
            error: "An error occurred while fetching messages",
        });
    }
};

module.exports = getUserMessages;
