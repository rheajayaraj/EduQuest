const Plan = require("../../models/usersubscriptions");
const Subscription = require("../../models/subscriptionplans");
const userverify = require("../../middleware/userverification");
const mongoose = require("mongoose");

module.exports = async (req, res) => {
  try {
    const user = await userverify(req.headers.authorization);
    if (typeof user === "string") {
      return res.status(404).json({ message: user });
    }
    const subplans = await Subscription.findById(req.params.planid);
    if (!subplans) {
      return res.status(404).json({ message: "Plan not found" });
    }
    const plan = await Plan.findOne({
      user_id: new mongoose.Types.ObjectId(user.id),
    });
    if (plan) {
      return res.status(400).json({ message: "Plan already subscribed" });
    }
    const data = {
      user_id: new mongoose.Types.ObjectId(user.id),
      subplan_id: new mongoose.Types.ObjectId(req.params.planid),
    };
    const newPlan = new Plan(data);
    const savedPlan = await newPlan.save();
    return res.status(200).json(savedPlan);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
