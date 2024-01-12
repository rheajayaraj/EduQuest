const Course = require("../../models/coursesjoined");
const PlanUser = require("../../models/usersubscriptions");
const mongoose = require("mongoose");
const Courses = require("../../models/courses");
const userverify = require("../../middleware/userverification");

module.exports = async (req, res) => {
  try {
    const user = await userverify(req.headers.authorization);
    if (typeof user === "string") {
      return res.status(404).json({ message: user });
    }
    const plan = await PlanUser.findOne({ user_id: user.id }).populate(
      "subplan_id"
    );
    if (!plan) {
      return res.status(404).json({ message: "User not subscribed yet" });
    }
    const time_period = plan.subplan_id.time_period;
    const createdAt = plan.createdAt;
    const currentDate = new Date();
    let subscriptionEndDate = new Date(createdAt);
    if (time_period.endsWith("m")) {
      subscriptionEndDate.setMonth(
        subscriptionEndDate.getMonth() + parseInt(time_period)
      );
    } else if (time_period.endsWith("y")) {
      subscriptionEndDate.setFullYear(
        subscriptionEndDate.getFullYear() + parseInt(time_period)
      );
    }
    if (currentDate > subscriptionEndDate) {
      return res.status(404).json({ message: "User subscription has expired" });
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
      return res.status(400).json({ message: "Course already enrolled" });
    }
    const data = {
      user_id: new mongoose.Types.ObjectId(user.id),
      course_id: new mongoose.Types.ObjectId(req.params.courseid),
    };
    const newCourse = new Course(data);
    const savedCourse = await newCourse.save();
    return res.status(200).json(savedCourse);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
