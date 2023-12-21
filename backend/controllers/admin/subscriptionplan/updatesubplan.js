const SubPlan = require("../../../models/subscriptionplans");

module.exports = async (req, res) => {
  try {
    const plan = await SubPlan.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }
    plan.name = req.body.name || plan.name;
    plan.price = req.body.price || plan.price;
    plan.time_period = req.body.time_period || plan.time_period;
    plan.is_active = req.body.is_active || plan.is_active;
    const updatedPlan = await plan.save();
    res.status(200).json(updatedPlan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
