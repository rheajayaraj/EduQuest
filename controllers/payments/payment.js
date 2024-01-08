const Payment = require("../../models/payments");
const userverify = require("../../middleware/userverification");
const mongoose = require("mongoose");

module.exports = async (req, res) => {
  try {
    const user = await userverify(req.headers.authorization);
    if (typeof user === "string") {
      return res.status(404).json({ message: user });
    }
    const data = {
      user_id: new mongoose.Types.ObjectId(user.id),
      subplan_id: new mongoose.Types.ObjectId(req.params.planid),
      payment_id: req.body.payment_id,
    };
    const newPayment = new Payment(data);
    const savedPayment = await newPayment.save();
    return res.status(200).json(savedPayment);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
