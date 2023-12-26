const express = require("express");
const router = express.Router();
const categories = require("../../controllers/categories/listcategories");

router.get("/categories", categories);

module.exports = router;
