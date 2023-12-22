const Course = require("../../models/coursesjoined");
const User = require("../../models/user");
const decrypt = require("../../middleware/saltdecrypt");
const verify = require("../../middleware/jwtverify");

module.exports = async (req, res) => {
  try {
    decryptedData = await decrypt(req.headers.authorization);
    const decoded = await verify(decryptedData);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const course = await Course.findOne({
      course_id: req.params.courseid,
      user_id: decoded.id,
    });
    if (course) {
      return res.status(400).json({ message: "Course already subscribed" });
    }
    const data = {
      user_id: user.id,
      course_id: req.params.courseid,
    };
    const newCourse = new Course(data);
    const savedCourse = await newCourse.save();
    res.status(200).json(savedCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
