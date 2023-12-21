const Plan = require("../../models/usersubscriptions");
const User = require("../../models/user");
const decrypt = require("../../middleware/saltdecrypt");
const verify = require("../../middleware/jwtverify");

module.exports = async (req, res) => {
  try {
    decryptedData = await decrypt(req.headers.authorization);
    const decoded = await verify(decryptedData);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const plan = await Plan.findOne({
      user_id: decoded.id,
    });
    if (plan) {
      return res.status(400).json({ message: "Plan already subscribed" });
    }
    const data = {
      user_id: user.id,
      subplan_id: req.params.planid,
    };
    const newPlan = new Plan(data);
    const savedPlan = await newPlan.save();
    res.status(200).json(savedPlan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
