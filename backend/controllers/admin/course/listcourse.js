const Course = require("../../../models/courses");

module.exports = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).json(courses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
