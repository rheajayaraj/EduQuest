const Course = require("../../../models/courses");
const Category = require("../../../models/categories");
const mongoose = require("mongoose");

module.exports = async (req, res) => {
  try {
    const category = await Category.findOne({ name: req.body.category });
    data = new Course({
      name: req.body.name,
      duration: req.body.duration,
      educator: req.body.educator,
      category_id: new mongoose.Types.ObjectId(category.id),
    });
    const dataToSave = await data.save();
    return res.status(200).json(dataToSave);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
