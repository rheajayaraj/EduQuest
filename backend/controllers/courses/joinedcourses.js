const Course = require("../../models/coursesjoined");
const User = require("../../models/user");
const Courses = require("../../models/courses");
const decrypt = require("../../middleware/saltdecrypt");
const verify = require("../../middleware/jwtverify");

module.exports = async (req, res) => {
  try {
    const decryptedData = await decrypt(req.headers.authorization);
    const decoded = await verify(decryptedData);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const joinedCourses = await Course.find({ user_id: decoded.id });
    if (joinedCourses.length === 0) {
      return res.status(404).json({ message: "No courses joined yet" });
    }
    const courseIds = joinedCourses.map((course) => course.course_id);
    const coursesJoined = await Courses.find({ _id: { $in: courseIds } });
    res.status(200).json(coursesJoined);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
