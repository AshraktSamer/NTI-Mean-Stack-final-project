const jwt = require("jsonwebtoken");
require("dotenv").config();


module.exports = async (payload) => {
  const token = await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });
  return token;
};
