const express = require("express");
const router = express.Router();
const listtc = require("../../controllers/legal/getterms&conditions");
const listpp = require("../../controllers/legal/getprivacypolicy");

router.get("/legal/tc", listtc);
router.get("/legal/pp", listpp);

module.exports = router;
