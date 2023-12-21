const jwt = require("jsonwebtoken");

const verify = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return decoded;
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return "Token has expired";
    } else {
      return "Invalid token";
    }
  }
};

module.exports = verify;
