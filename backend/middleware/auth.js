const jwt = require("jsonwebtoken");
// const config = require("config");

module.exports = function (req, res, next) {
  //Get the token from header
  const token = req.header("x-auth-token");

  //Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.LOGIN_TOKEN);
    req.user = decoded.user;
    console.log(" user " + req.user);
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
