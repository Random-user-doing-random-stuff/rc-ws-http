const { app } = require("../router");

const root = (req, res) => {
  res.send("Im up");
}
module.exports = root;