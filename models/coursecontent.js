const mongoose = require("mongoose");

const coursecontentSchema = new mongoose.Schema(
  {
    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Courses",
    },
    short_description: {
      type: String,
    },
    long_description: {
      type: String,
    },
    video_path: {
      type: String,
    },
    thumbnail_path: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "course_content",
  coursecontentSchema,
  "course_content"
);
