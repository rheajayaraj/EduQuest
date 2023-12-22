const Plan = require("../../models/usersubscriptions");
const User = require("../../models/user");
const Plans = require("../../models/subscriptionplans");
const decrypt = require("../../middleware/saltdecrypt");
const verify = require("../../middleware/jwtverify");

module.exports = async (req, res) => {
  try {
    const decryptedData = await decrypt(req.headers.authorization);
    const decoded = await verify(decryptedData);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const joinedPlans = await Plan.find({ user_id: decoded.id });
    if (joinedPlans.length === 0) {
      return res.status(404).json({ message: "No courses joined yet" });
    }
    const planIds = joinedPlans.map((plan) => plan.subplan_id);
    const plansJoined = await Plans.find({ _id: { $in: planIds } });
    res.status(200).json(plansJoined);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
