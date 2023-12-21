const mongoose = require("mongoose");

const coursejoinSchema = new mongoose.Schema({
  user_id: {
    type: String,
  },
  subplan_id: {
    type: String,
  },
});

module.exports = mongoose.model("user_subscription", coursejoinSchema);
