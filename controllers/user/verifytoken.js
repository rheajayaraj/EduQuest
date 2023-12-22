const User = require("../../models/user");
const decrypt = require("../../middleware/saltdecrypt");
const verify = require("../../middleware/jwtverify");

module.exports = async (req, res) => {
  try {
    const decryptedData = await decrypt(req.headers.authorization);
    const decoded = await verify(decryptedData);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      return res.status(200).json({ message: "User found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
