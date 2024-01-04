const CourseJoined = require("../../models/coursesjoined");
const Courses = require("../../models/courses");
const PlanUser = require("../../models/usersubscriptions");
const mongoose = require("mongoose");
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
