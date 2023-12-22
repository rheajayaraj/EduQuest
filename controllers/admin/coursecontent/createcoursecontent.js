const Course = require("../../../models/coursecontent");

module.exports = async (req, res) => {
  try {
    data = new Course({
      course_id: req.params.id,
      short_description: req.body.short_description,
      long_description: req.body.long_description,
      video_path: req.body.video_path,
      thumbnail_path: req.body.thumbnail_path,
    });
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
