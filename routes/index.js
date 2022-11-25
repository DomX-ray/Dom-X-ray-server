const express = require("express");
const router = express.Router();

const Controller = require("./controller");
const isAValidUrl = require("./middleware/validateUrl");

router.get("/", Controller.getMain);

router.get("/visualization", isAValidUrl, Controller.parseDomTree);

module.exports = router;
