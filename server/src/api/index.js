const express = require("express");

const companies = require("./companies");
const citys = require("./citys");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏"
  });
});

router.use("/companies", companies);
router.use("/city", citys);

module.exports = router;
