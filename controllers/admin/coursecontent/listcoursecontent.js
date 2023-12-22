const Course = require("../../../models/coursecontent");

module.exports = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
