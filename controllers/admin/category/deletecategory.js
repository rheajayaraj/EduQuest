const Category = require("../../../models/categories");

module.exports = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (deletedCategory) {
      return res.status(200).json({ message: "Category deleted successfully" });
    } else {
      return res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
