const Course = require("../../models/coursecontent");

module.exports = async (req, res) => {
  try {
    const course = await Course.find({ course_id: req.params.courseid });
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
