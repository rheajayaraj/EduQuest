const express = require("express");
const router = express.Router();

//user
const createuser = require("../../controllers/admin/user/createuser");
const updateuser = require("../../controllers/admin/user/updateuser");
const deleteuser = require("../../controllers/admin/user/deleteuser");
const listuser = require("../../controllers/admin/user/listusers");

router.post("/admin/createuser", createuser);
router.patch("/admin/updateuser/:id", updateuser);
router.delete("/admin/deleteuser/:id", deleteuser);
router.get("/admin/listuser", listuser);

//category
const createcategory = require("../../controllers/admin/category/createcategory");
const updatecategory = require("../../controllers/admin/category/updatecategory");
const deletecategory = require("../../controllers/admin/category/deletecategory");
const listcategory = require("../../controllers/admin/category/listcategory");

router.post("/admin/createcategory", createcategory);
router.patch("/admin/updatecategory/:id", updatecategory);
router.delete("/admin/deletecategory/:id", deletecategory);
router.get("/admin/listcategory", listcategory);

//subscription plan
const createsubplan = require("../../controllers/admin/subscriptionplan/createsubplan");
const updatesubplan = require("../../controllers/admin/subscriptionplan/updatesubplan");
const deletesubplan = require("../../controllers/admin/subscriptionplan/deletesubplan");
const listsubplan = require("../../controllers/admin/subscriptionplan/listsubplan");

router.post("/admin/createplan", createsubplan);
router.patch("/admin/updateplan/:id", updatesubplan);
router.delete("/admin/deleteplan/:id", deletesubplan);
router.get("/admin/listplan", listsubplan);

//course
const createcourse = require("../../controllers/admin/course/createcourse");
const updatecourse = require("../../controllers/admin/course/updatecourse");
const deletecourse = require("../../controllers/admin/course/deletecourse");
const listcourse = require("../../controllers/admin/course/listcourse");

router.post("/admin/createcourse", createcourse);
router.patch("/admin/updatecourse/:id", updatecourse);
router.delete("/admin/deletecourse/:id", deletecourse);
router.get("/admin/listcourse", listcourse);

//course content
const createcoursecontent = require("../../controllers/admin/coursecontent/createcoursecontent");
const updatecoursecontent = require("../../controllers/admin/coursecontent/updatecoursecontent");
const deletecoursecontent = require("../../controllers/admin/coursecontent/deletecoursecontent");
const listcoursecontent = require("../../controllers/admin/coursecontent/listcoursecontent");

router.post("/admin/createcoursecontent/:id", createcoursecontent);
router.patch("/admin/updatecoursecontent/:id", updatecoursecontent);
router.delete("/admin/deletecoursecontent/:id", deletecoursecontent);
router.get("/admin/listcoursecontent/:id", listcoursecontent);

//course-user
const deletecourseuser = require("../../controllers/admin/usercourse/deleteusercourse");
const listcourseuser = require("../../controllers/admin/usercourse/listusercourse");

router.delete("/admin/deletecourseuser/:id", deletecourseuser);
router.get("/admin/listcourseuser", listcourseuser);

//plan-user
const deleteplanuser = require("../../controllers/admin/usersubscription/deleteusercourse");
const listplanuser = require("../../controllers/admin/usersubscription/listusercourse");

router.delete("/admin/deleteplanuser/:id", deleteplanuser);
router.get("/admin/listplanuser", listplanuser);

module.exports = router;
