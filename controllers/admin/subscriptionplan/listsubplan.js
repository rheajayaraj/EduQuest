const SubPlan = require("../../../models/subscriptionplans");

module.exports = async (req, res) => {
  try {
    const plans = await SubPlan.find({});
    return res.status(200).json(plans);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
