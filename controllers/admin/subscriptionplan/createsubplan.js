const Subplan = require("../../../models/subscriptionplans");

module.exports = async (req, res) => {
  try {
    data = new Subplan({
      name: req.body.name,
      price: req.body.price,
      time_period: req.body.time_period,
      is_active: req.body.is_active,
    });
    const dataToSave = await data.save();
    return res.status(200).json(dataToSave);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
