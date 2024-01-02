const Course = require("../../../models/courses");

module.exports = async (req, res) => {
  try {
    const courses = await Course.find({}).populate("category_id");
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
