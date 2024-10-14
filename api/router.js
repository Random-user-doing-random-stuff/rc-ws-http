const express = require("express");
const app = express();
const root = require("./routes/root");
const login = require("./routes/user/login");
app.use(express.json());

app.post("/user/login", login);
app.get("/", root);

module.exports = { app };
