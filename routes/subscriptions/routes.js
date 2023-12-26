const express = require("express");
const router = express.Router();
const subscriptionplans = require("../../controllers/subscriptions/listsubscriptionplans");
const joinplan = require("../../controllers/subscriptions/subscribe");
const joinedplans = require("../../controllers/subscriptions/usersubscriptions");

router.get("/subscriptionplans", subscriptionplans);
router.post("/joinplan/:planid", joinplan);
router.get("/joinedplans", joinedplans);

module.exports = router;