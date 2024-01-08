const Course = require("../../models/coursecontent");
const mongoose = require("mongoose");
const AWS = require("aws-sdk");

module.exports = async (req, res) => {
  try {
    const course = await Course.findOne({
      course_id: new mongoose.Types.ObjectId(req.params.courseid),
    }).populate("course_id");
    if (course) {
      const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
        region: "ap-south-1",
      });
      if (course.video_path) {
        const key = course.video_path;
        const bucketName = process.env.AWS_BUCKET_NAME;
        const params = {
          Bucket: bucketName,
          Key: key,
          Expires: 3600,
        };
        const presignedUrl = s3.getSignedUrl("getObject", params);
        course.video_path = presignedUrl;
      }
      return res.status(200).json(course);
    } else {
      return res.status(404).json({ error: "Course not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
