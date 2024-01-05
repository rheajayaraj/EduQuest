const mongoose = require("mongoose");

const paymentsSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    subplan_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription_plans",
    },
    payment_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("payment", paymentsSchema);
