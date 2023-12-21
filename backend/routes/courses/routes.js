const express = require("express");
const router = express.Router();
const listcourses = require("../../controllers/courses/getcategories");

router.get("/courses/:categoryid", listcourses);

module.exports = router;
