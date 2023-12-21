const Category = require("../../../models/categories");

module.exports = async (req, res) => {
  try {
    data = new Category({
      name: req.body.name,
    });
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
