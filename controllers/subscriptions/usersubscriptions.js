const Plan = require("../../models/usersubscriptions");
const SubscriptionPlans = require("../../models/subscriptionplans");
const userverify = require("../../middleware/userverification");
const mongoose = require("mongoose");

module.exports = async (req, res) => {
  try {
    const user = await userverify(req.headers.authorization);
    if (typeof user === "string") {
      return res.status(404).json({ message: user });
    }
    const joinedPlans = await Plan.find({
      user_id: new mongoose.Types.ObjectId(user.id),
    });
    if (joinedPlans.length === 0) {
      return res.status(404).json({ message: "No plans joined yet" });
    }
    const planIds = joinedPlans.map((plan) => plan.subplan_id);
    const plansJoined = await SubscriptionPlans.find({ _id: { $in: planIds } });
    return res.status(200).json(plansJoined);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
