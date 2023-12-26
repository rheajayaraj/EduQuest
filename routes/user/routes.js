const express = require("express");
const router = express.Router();
const signup = require("../../controllers/user/signupcontroller");
const login = require("../../controllers/user/logincontroller");
const passwordreset = require("../../controllers/user/passwordresetcontroller");
const forgotpassword = require("../../controllers/user/forgotpasswordcontroller");
const userdetails = require("../../controllers/user/userdetailscontroller");
const userupdate = require("../../controllers/user/updateusercontroller");
const deleteuser = require("../../controllers/user/deleteusercontroller");
const verifytoken = require("../../controllers/user/verifytoken");

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgotpassword", forgotpassword);
router.post("/passwordreset", passwordreset);
router.get("/user", userdetails);
router.patch("/updateuser", userupdate);
router.delete("/deleteuser", deleteuser);
router.post("/verifytoken", verifytoken);

module.exports = router;
