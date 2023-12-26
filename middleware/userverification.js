const User = require("../models/user");
const decrypt = require("../middleware/saltdecrypt");
const verify = require("../middleware/jwtverify");

const userverify = async (data) => {
  try {
    const decryptedData = await decrypt(data);
    const decoded = await verify(decryptedData);
    if (typeof decoded === "string") {
      return decoded;
    }
    const user = await User.findById(decoded.id);
    if (!user) {
      return "User not found";
    }
    return user;
  } catch (error) {
    return "Invalid token";
  }
};

module.exports = userverify;
