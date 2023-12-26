const CourseJoined = require("../../models/coursesjoined");
const Courses = require("../../models/courses");
const mongoose = require("mongoose");
const userverify = require("../../middleware/userverification");

module.exports = async (req, res) => {
  try {
    const user = await userverify(req.headers.authorization);
    if (typeof user === "string") {
      return res.status(404).json({ message: user });
    }
    const joinedCourses = await CourseJoined.find({
      user_id: new mongoose.Types.ObjectId(user.id),
    });
    if (joinedCourses.length === 0) {
      return res.status(404).json({ message: "No courses joined yet" });
    }
    const courseIds = joinedCourses.map((course) => course.course_id);
    const coursesJoined = await Courses.find({
      _id: { $in: courseIds.map((id) => new mongoose.Types.ObjectId(id)) },
    });
    return res.status(200).json(coursesJoined);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
