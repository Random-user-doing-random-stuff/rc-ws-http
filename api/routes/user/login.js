const { app } = require("../../router");
const {User} = require('../../../db/schemas/user')
const login = (req, res) => {
  console.log(req.body);
  res.send("sup");
}
module.exports = login;

User