const express = require("express");
const app = express();

const root = require("./routes/root");
const login = require("./routes/user/login");
const register = require("./routes/user/register");

app.use(express.json());

app.post("/user/login", login);
app.get("/", root);
app.post("/user/register", register);

module.exports = { app };
