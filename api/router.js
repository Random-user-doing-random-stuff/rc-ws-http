// /api/router.js

const express = require("express");
const app = express();

const root = require("./routes/root");
const login = require("./routes/user/login");
const register = require("./routes/user/register");
const sendMessage = require("./routes/message/send");  // Import the new send message route
const getMessages = require("./routes/message/messages");
const signin = require("./routes/signin")
app.use(express.json());

app.post("/user/login", login);
app.post("/user/register", register);
app.get("/messages/:chatId", getMessages);
app.post("/messages/send", sendMessage);  // Add the route for sending messages
app.get("/", root);
app.get("/login", signin)
module.exports = { app };
