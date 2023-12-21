const Courses = require("../../models/courses");

module.exports = async (req, res) => {
  try {
    const courses = await Courses.find({ category_id: req.params.categoryid });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
