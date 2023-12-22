const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  duration: {
    type: Number,
  },
  educator: {
    type: String,
  },
  category_id: {
    type: String,
  },
});

module.exports = mongoose.model("Courses", courseSchema);
