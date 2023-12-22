const User = require("../../models/user");
const decrypt = require("../../middleware/saltdecrypt");
const verify = require("../../middleware/jwtverify");

module.exports = async (req, res) => {
  try {
    decryptedData = await decrypt(req.headers.authorization);
    console.log(decryptedData);
    const decoded = await verify(decryptedData);
    console.log(decoded);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
