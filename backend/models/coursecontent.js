const mongoose = require("mongoose");

const coursecontentSchema = new mongoose.Schema({
  course_id: {
    type: String,
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
});

module.exports = mongoose.model(
  "course_content",
  coursecontentSchema,
  "course_content"
);
