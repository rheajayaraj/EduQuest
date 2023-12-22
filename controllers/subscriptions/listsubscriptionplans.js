const Subscription = require("../../models/subscriptionplans");

module.exports = async (req, res) => {
  try {
    const subplans = await Subscription.find({});
    res.status(200).json(subplans);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
