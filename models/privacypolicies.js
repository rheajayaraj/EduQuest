const mongoose = require("mongoose");

const privacypolicySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("privacy_policy", privacypolicySchema);
