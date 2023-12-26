const Courses = require("../../models/courses");
const mongoose = require("mongoose");

module.exports = async (req, res) => {
  try {
    const courses = await Courses.find({
      category_id: new mongoose.Types.ObjectId(req.params.categoryid),
    });
    if (courses.length > 0) {
      return res.status(200).json(courses);
    } else {
      return res.status(404).json({ error: "Category not available" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
