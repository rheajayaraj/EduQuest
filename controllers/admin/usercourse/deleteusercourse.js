const Course = require("../../../models/coursesjoined");

module.exports = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (deletedCourse) {
      res.status(200).json({ message: "Course-User deleted successfully" });
    } else {
      res.status(404).json({ message: "Course-User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
