const Course = require("../../../models/courses");
const Category = require("../../../models/categories");

module.exports = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    const category = await Category.findOne({ name: req.body.category });
    course.name = req.body.name || course.name;
    course.duration = req.body.duration || course.duration;
    course.educator = req.body.educator || course.educator;
    course.category_id = category.id || course.category_id;
    const updatedCourse = await course.save();
    res.status(200).json(updatedCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
