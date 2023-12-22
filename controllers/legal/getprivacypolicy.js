const PP = require("../../models/privacypolicies");

module.exports = async (req, res) => {
  try {
    const pp = await PP.find({});
    res.status(200).json(pp);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
