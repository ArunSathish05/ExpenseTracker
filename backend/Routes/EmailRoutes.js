const express = require("express");
const router = express.Router();
const EmailControl = require("../controller/EmailControl");

router.post("/email", EmailControl);

module.exports = router;
