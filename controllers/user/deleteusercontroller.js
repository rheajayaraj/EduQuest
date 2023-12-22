const User = require("../../models/user");
const decrypt = require("../../middleware/saltdecrypt");
const verify = require("../../middleware/jwtverify");

module.exports = async (req, res) => {
  try {
    decryptedData = await decrypt(req.headers.authorization);
    console.log(decryptedData);
    const decoded = await verify(decryptedData);
    console.log(decoded);
    const deletedUser = await User.findByIdAndDelete(decoded.id);
    if (deletedUser) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
