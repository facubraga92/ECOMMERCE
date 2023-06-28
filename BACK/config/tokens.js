const jwt = require("jsonwebtoken");

let generateToken = (payload) => {
  let token = jwt.sign(payload, "TRASHTALK", { expiresIn: "2h" });
  return token;
};

let validateToken = (token) => {
  try {
    return jwt.verify(token, "TRASHTALK");
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateToken,
  validateToken,
};
