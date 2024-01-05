const express = require("express");
const router = express.Router();
const subscriptionplans = require("../../controllers/subscriptions/listsubscriptionplans");
const joinplan = require("../../controllers/subscriptions/subscribe");
const joinedplans = require("../../controllers/subscriptions/usersubscriptions");
const checksubscription = require("../../controllers/subscriptions/checksubscription");

router.get("/subscriptionplans", subscriptionplans);
router.post("/joinplan/:planid", joinplan);
router.get("/joinedplans", joinedplans);
router.post("/checksubscription", checksubscription);

module.exports = router;
