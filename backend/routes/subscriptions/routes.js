const express = require("express");
const router = express.Router();
const listsubscriptionplans = require("../../controllers/subscriptions/listsubscriptionplans");

router.get("/subscriptions", listsubscriptionplans);

module.exports = router;
