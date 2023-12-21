const SubPlan = require("../../../models/subscriptionplans");

module.exports = async (req, res) => {
  try {
    const plans = await SubPlan.find({});
    res.status(200).json(plans);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
