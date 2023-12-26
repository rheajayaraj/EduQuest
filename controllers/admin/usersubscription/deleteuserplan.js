const Plan = require("../../../models/usersubscriptions");

module.exports = async (req, res) => {
  try {
    const deletedPlan = await Plan.findByIdAndDelete(req.params.id);
    if (deletedPlan) {
      return res
        .status(200)
        .json({ message: "Plan-User deleted successfully" });
    } else {
      return res.status(404).json({ message: "Plan-User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
