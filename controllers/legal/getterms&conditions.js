const TC = require("../../models/terms&conditions");

module.exports = async (req, res) => {
  try {
    const tc = await TC.find({});
    res.status(200).json(tc);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
