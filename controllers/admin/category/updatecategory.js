const Category = require("../../../models/categories");

module.exports = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    category.name = req.body.name || category.name;
    const updatedCategory = await category.save();
    return res.status(200).json(updatedCategory);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
