const express = require("express");
const router = express.Router();
const listcourses = require("../../controllers/courses/getcourses");
const getcoursecontent = require("../../controllers/courses/getcoursecontent");
const joincourse = require("../../controllers/courses/joincourse");
const joinedcourse = require("../../controllers/courses/joinedcourses");

router.get("/courses/:categoryid", listcourses);
router.get("/coursecontent/:courseid", getcoursecontent);
router.post("/joincourse/:courseid", joincourse);
router.get("/joinedcourses", joinedcourse);

module.exports = router;
