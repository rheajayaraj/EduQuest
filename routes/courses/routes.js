const express = require("express");
const router = express.Router();
const courses = require("../../controllers/courses/getcourses");
const coursecontent = require("../../controllers/courses/getcoursecontent");
const joincourse = require("../../controllers/courses/joincourse");
const joinedcourse = require("../../controllers/courses/joinedcourses");

router.get("/courses/:categoryid", courses);
router.get("/coursecontent/:courseid", coursecontent);
router.post("/joincourse/:courseid", joincourse);
router.get("/joinedcourses", joinedcourse);

module.exports = router;
