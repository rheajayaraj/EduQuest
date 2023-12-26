const Course = require("../../../models/coursesjoined");

module.exports = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (deletedCourse) {
      return res
        .status(200)
        .json({ message: "Course-User deleted successfully" });
    } else {
      return res.status(404).json({ message: "Course-User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
