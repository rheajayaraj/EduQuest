const Category = require("../../models/categories");

module.exports = async (req, res) => {
  try {
    const categories = await Category.find({});
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};
