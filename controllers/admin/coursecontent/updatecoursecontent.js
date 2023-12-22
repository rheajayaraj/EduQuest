const Course = require("../../../models/coursecontent");

module.exports = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    course.short_description =
      req.body.short_description || course.short_description;
    course.long_description =
      req.body.long_description || course.long_description;
    course.video_path = req.body.video_path || course.video_path;
    course.thumbnail_path = req.body.thumbnail_path || course.thumbnail_path;
    const updatedCourse = await course.save();
    res.status(200).json(updatedCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
