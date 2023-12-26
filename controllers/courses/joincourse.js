const Course = require("../../models/coursesjoined");
const mongoose = require("mongoose");
const Courses = require("../../models/courses");
const userverify = require("../../middleware/userverification");

module.exports = async (req, res) => {
  try {
    const user = await userverify(req.headers.authorization);
    if (typeof user === "string") {
      return res.status(404).json({ message: user });
    }
    const courses = await Courses.findById(req.params.courseid);
    if (!courses) {
      return res.status(404).json({ message: "Course not found" });
    }
    const course = await Course.findOne({
      course_id: new mongoose.Types.ObjectId(req.params.courseid),
      user_id: new mongoose.Types.ObjectId(user.id),
    });
    if (course) {
      return res.status(400).json({ message: "Course already subscribed" });
    }
    const data = {
      user_id: new mongoose.Types.ObjectId(user.id),
      course_id: new mongoose.Types.ObjectId(req.params.courseid),
    };
    const newCourse = new Course(data);
    const savedCourse = await newCourse.save();
    return res.status(200).json(savedCourse);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
