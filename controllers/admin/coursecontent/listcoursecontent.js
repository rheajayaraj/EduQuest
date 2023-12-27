const Course = require("../../../models/coursecontent");

module.exports = async (req, res) => {
  try {
    const course = await Course.find({});
    return res.status(200).json(course);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
