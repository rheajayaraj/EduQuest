const Subscription = require("../../models/subscriptionplans");

module.exports = async (req, res) => {
  try {
    const subplans = await Subscription.find({ is_active: true });
    return res.status(200).json(subplans);
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};
