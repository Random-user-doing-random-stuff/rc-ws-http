const { app } = require("../router");

const root = (req, res) => {
  res.send(require('fs').readFileSync('index.html', 'utf8'));
}
module.exports = root;