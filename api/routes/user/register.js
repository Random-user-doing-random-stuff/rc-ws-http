const { client } = require("../../../db/connection");
const user = require("../../../db/schemas/user");
const register = (req, res) => {
  console.log(req.body);
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  if (user.name && user.email && user.password) {
    client
      .db("RC")
      .collection("users")
      .insertOne(user, (err, result) => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
  }
};

module.exports = register;
