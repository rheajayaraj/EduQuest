const Course = require("../../../models/coursecontent");
const AWS = require("aws-sdk");
const multer = require("multer");

const upload = multer();

module.exports = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    if (course.video_path) {
      const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
        region: "ap-south-1",
      });
      const deleteParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${course.video_path}`,
      };
      await s3.deleteObject(deleteParams).promise();
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
      course.short_description =
        req.body.short_description || course.short_description;
      course.long_description =
        req.body.long_description || course.long_description;
      course.video_path = videoId;
      course.thumbnail_path = req.body.thumbnail_path || course.thumbnail_path;
      const updatedCourse = await course.save();
      return res.status(200).json(updatedCourse);
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
