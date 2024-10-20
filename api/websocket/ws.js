const WebSocket = require("ws");
const jwt = require("jsonwebtoken");

// Secret key for JWT (should match with the login server)
const SECRET_KEY = "boas";

// Create WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// Store clients by roomId
const rooms = {};

// Function to broadcast a message to everyone in the same room
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
    // Extract the token and roomId from the WebSocket query string
    const params = new URLSearchParams(req.url.split("?")[1]);
    const token = params.get("token");
    const roomId = params.get("roomId");

    // Verify the JWT token
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            ws.send("Invalid token");
            ws.close();
            return;
        }
        ws.user = decoded;

        // If the token is valid, the user is authenticated
        ws.username = ws.user.username; // Assuming the JWT contains a username

        // Add the client to the room
        if (!rooms[roomId]) {
            rooms[roomId] = [];
        }
        rooms[roomId].push(ws);
        console.log(`${ws.username} joined room ${roomId}`);

        ws.send(`Welcome ${ws.username}, you are in room ${roomId}`);

        // Broadcast incoming messages to everyone in the room
        ws.on("message", (message) => {
            console.log(
                `Message from ${ws.username} in room ${roomId}: ${message}`,
            );
            broadcastToRoom(roomId, ws, `${ws.username}: ${message}`);
            rooms[roomId].forEach((client) => {
                console.log(client.username);
            });
        });

        // Handle client disconnect
        ws.on("close", () => {
            console.log(`${ws.username} disconnected from room ${roomId}`);
            // Remove the client from the room
            rooms[roomId] = rooms[roomId].filter((client) => client !== ws);
        });
    });
});

module.exports = wss;
