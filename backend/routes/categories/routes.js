const express = require("express");
const router = express.Router();
const listcategories = require("../../controllers/categories/listcategories");

router.get("/categories", listcategories);

module.exports = router;
