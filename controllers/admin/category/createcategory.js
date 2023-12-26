const Category = require("../../../models/categories");

module.exports = async (req, res) => {
  try {
    data = new Category({
      name: req.body.name,
      thumbnail_path: req.body.thumbnail_path,
    });
    const dataToSave = await data.save();
    return res.status(200).json(dataToSave);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
