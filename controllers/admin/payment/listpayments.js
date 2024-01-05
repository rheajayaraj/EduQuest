const Payment = require("../../../models/payments");

module.exports = async (req, res) => {
  try {
    const payments = await Payment.find({}).populate(["user_id", "subplan_id"]);
    return res.status(200).json(payments);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
