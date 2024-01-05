const Course = require("../../../models/coursecontent");
const mongoose = require("mongoose");
const AWS = require("aws-sdk");
const multer = require("multer");

const upload = multer();

module.exports = async (req, res) => {
  try {
    const existingCourse = await Course.findOne({ course_id: req.params.id });
    if (existingCourse) {
      return res.status(400).json({ error: "Course already exists" });
    }
    upload.single("video")(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: "Multer error: " + err.message });
      } else if (err) {
        return res.status(500).json({ error: "Error: " + err.message });
      }
      const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
        region: "ap-south-1",
      });
      const videoFile = req.file.buffer;
      const videoId = `${req.params.id}-${Date.now()}.mp4`;
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${videoId}`,
        Body: videoFile,
        ContentType: "video/mp4",
      };
      const uploadResult = await s3.upload(params).promise();
      const newCourse = new Course({
        course_id: new mongoose.Types.ObjectId(req.params.id),
        short_description: req.body.short_description,
        long_description: req.body.long_description,
        video_path: uploadResult.Key,
        thumbnail_path: req.body.thumbnail_path,
      });
      const savedCourse = await newCourse.save();
      return res.status(200).json(savedCourse);
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
