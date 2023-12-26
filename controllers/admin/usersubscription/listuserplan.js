const Plan = require("../../../models/usersubscriptions");

module.exports = async (req, res) => {
  try {
    const plans = await Plan.find({});
    return res.status(200).json(plans);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
