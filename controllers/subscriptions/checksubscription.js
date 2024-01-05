const Plan = require("../../models/usersubscriptions");
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
    if (joinedPlans.length == 0) {
      return res.status(200).json({ message: "Subscribe" });
    } else {
      return res.status(400).json({ message: "Don't subscribe" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
