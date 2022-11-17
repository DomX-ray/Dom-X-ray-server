const express = require("express");
const router = express.Router();

const { OK } = require("../constants/statusCode");

router.get("/", (req, res, next) => {
  res.render("index", { title: "Express" });
});

module.exports = router;
