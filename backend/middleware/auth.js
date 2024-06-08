const jwt = require("jsonwebtoken");
const User = require("../model/user");

exports.authenticator = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const user = jwt.verify(token, "magical-key-for-userAuthentication");
    User.findByPk(user.userId)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Failed to authenticate user" });
      });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
