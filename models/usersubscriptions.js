const mongoose = require("mongoose");

const coursejoinSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    subplan_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription_plans",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user_subscription", coursejoinSchema);
