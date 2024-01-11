const User = require("../../models/user");
const Course = require("../../models/coursesjoined");
const Plan = require("../../models/usersubscriptions");
const Payment = require("../../models/payments");
const userverify = require("../../middleware/userverification");
const deleteFromS3 = require("../../middleware/deleteFromS3");

module.exports = async (req, res) => {
  try {
    const user = await userverify(req.headers.authorization);
    if (typeof user === "string") {
      return res.status(404).json({ message: user });
    }
    if (typeof user.image === "string" && user.image.length > 0) {
      await deleteFromS3(user.image);
    }
    await Course.deleteMany({ user_id: user.id });
    await Plan.deleteMany({ user_id: user.id });
    await Payment.deleteMany({ user_id: user.id });
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
