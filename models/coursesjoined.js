const mongoose = require("mongoose");

const coursejoinSchema = new mongoose.Schema({
  user_id: {
    type: String,
  },
  course_id: {
    type: String,
  },
});

module.exports = mongoose.model("courses_subscribed", coursejoinSchema);
