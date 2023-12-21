const mongoose = require("mongoose");

const termsconditionsSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("terms&condition", termsconditionsSchema);
