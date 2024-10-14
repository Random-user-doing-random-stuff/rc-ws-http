const { app } = require("../../router");

const login = (req, res) => {
  console.log(req.body);
  res.send("sup");
};
module.exports = login;
