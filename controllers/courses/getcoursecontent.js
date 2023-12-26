const Course = require("../../models/coursecontent");
const mongoose = require("mongoose");

module.exports = async (req, res) => {
  try {
    const course = await Course.findOne({
      course_id: new mongoose.Types.ObjectId(req.params.courseid),
    });
    if (course) {
      return res.status(200).json(course);
    } else {
      return res.status(404).json({ error: "Course not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
