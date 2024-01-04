const User = require("../../models/user");
const userverify = require("../../middleware/userverification");
const deleteFromS3 = require("../../middleware/deleteFromS3");

module.exports = async (req, res) => {
  try {
    const user = await userverify(req.headers.authorization);
    if (typeof user === "string") {
      return res.status(404).json({ message: user });
    }
    await deleteFromS3(user.image);
    const deletedUser = await User.findByIdAndDelete(user.id);
    if (deletedUser) {
      return res.status(200).json({ message: "User deleted successfully" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
