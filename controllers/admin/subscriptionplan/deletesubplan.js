const Plan = require("../../../models/subscriptionplans");

module.exports = async (req, res) => {
  try {
    const deletedPlan = await Plan.findByIdAndDelete(req.params.id);
    if (deletedPlan) {
      res.status(200).json({ message: "Plan deleted successfully" });
    } else {
      res.status(404).json({ message: "Plan not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
