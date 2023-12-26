const mongoose = require("mongoose");

const subscriptionplansSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
    time_period: {
      type: String,
    },
    is_active: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Subscription_plans", subscriptionplansSchema);
