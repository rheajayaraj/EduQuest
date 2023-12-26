const Course = require("../../../models/courses");
const Category = require("../../../models/categories");
const mongoose = require("mongoose");

module.exports = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    if (req.body.category) {
      const category = await Category.findOne({ name: req.body.category });
      if (category) {
        course.category_id = new mongoose.Types.ObjectId(category.id);
      } else {
        return res.status(404).json({ message: "Category not found" });
      }
    }
    course.name = req.body.name || course.name;
    course.duration = req.body.duration || course.duration;
    course.educator = req.body.educator || course.educator;
    const updatedCourse = await course.save();
    return res.status(200).json(updatedCourse);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
