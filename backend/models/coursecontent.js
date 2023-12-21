const mongoose = require("mongoose");

const coursecontentSchema = new mongoose.Schema({
  short_description: {
    type: String,
  },
  long_description: {
    type: Number,
  },
  video_path: {
    type: String,
  },
  thumbnail_path: {
    type: String,
  },
});

module.exports = mongoose.model("Course_content", coursecontentSchema);
