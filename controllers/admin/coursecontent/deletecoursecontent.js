const Course = require("../../../models/coursecontent");

module.exports = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (deletedCourse) {
      return res.status(200).json({ message: "Course deleted successfully" });
    } else {
      return res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
