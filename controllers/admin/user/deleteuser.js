const User = require("../../../models/user");
const Course = require("../../../models/coursesjoined");
const Plan = require("../../../models/usersubscriptions");
const Payment = require("../../../models/payments");

module.exports = async (req, res) => {
  try {
    await Course.deleteMany({ user_id: req.params.id });
    await Plan.deleteMany({ user_id: req.params.id });
    await Payment.deleteMany({ user_id: req.params.id });
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (deletedUser) {
      return res.status(200).json({ message: "User deleted successfully" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
