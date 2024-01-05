const express = require("express");
const router = express.Router();
const payment = require("../../controllers/payments/payment");

router.post("/payment/:planid", payment);

module.exports = router;
