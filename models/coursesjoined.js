const mongoose = require("mongoose");

const coursejoinSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Courses",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("courses_subscribed", coursejoinSchema);
