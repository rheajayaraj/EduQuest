const Course = require("../../../models/courses");
const Category = require("../../../models/categories");

module.exports = async (req, res) => {
  try {
    const category = await Category.findOne({ name: req.body.category });
    data = new Course({
      name: req.body.name,
      duration: req.body.duration,
      educator: req.body.educator,
      category_id: category.id,
    });
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
