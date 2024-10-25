// /api/websocket/ws.js

const WebSocket = require("ws");
const jwt = require("jsonwebtoken");
const { client } = require("../../db/connection");
const { ObjectId } = require("mongodb");

const SECRET_KEY = "boas"; // Same secret key used for JWT
const wss = new WebSocket.Server({ port: 8080 });

const rooms = {};

function broadcastToRoom(roomId, sender, message) {
  if (rooms[roomId]) {
    rooms[roomId].forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
}

wss.on("connection", (ws, req) => {
  const params = new URLSearchParams(req.url.split("?")[1]);
  const token = params.get("token");
  const roomId = params.get("roomId");

  if (!token) {
    ws.send("Authorization token required");
    ws.close();
    return;
  }

  jwt.verify(token, SECRET_KEY, async (err, decoded) => {
    if (err) {
      ws.send("Invalid token");
      ws.close();
      return;
    }

    // Extract user details from the decoded token
    ws.user = decoded;
    ws.username = ws.user.name; // Assuming 'name' exists in the JWT payload

    if (!rooms[roomId]) {
      rooms[roomId] = [];
    }
    rooms[roomId].push(ws);

    ws.send(`Welcome ${ws.username}, you are in room ${roomId}`);

    ws.on("message", async (messageText) => {
      console.log(`Message from ${ws.username} in room ${roomId}: ${messageText}`);

      // Broadcast the message to everyone in the room
      broadcastToRoom(roomId, ws, `${ws.username}: ${messageText}`);

      // Save the message in the database
      const message = {
        chatRoomId: new ObjectId(roomId),
        senderId: new ObjectId(ws.user.id), // Using decoded JWT for senderId
        messageText,
        createdAt: new Date(),
      };

      try {
        await client.db("RC").collection("messages").insertOne(message);
      } catch (error) {
        console.error("Error saving message to DB:", error);
      }
    });

    ws.on("close", () => {
      rooms[roomId] = rooms[roomId].filter((client) => client !== ws);
      console.log(`${ws.username} disconnected from room ${roomId}`);
    });
  });
});

module.exports = wss;
