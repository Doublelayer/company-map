const express = require("express");

const router = express.Router();

const db = require("../database");

router.post("/searchcity", (req, res) => {
  const { input } = req.body;

  db.get()
    .collection(process.env.COLLECTION_NAME)
    .distinct("city", { city: { $regex: new RegExp(`^${input}`, "i") } })
    .then(citys => {
      res.status(200).json(citys);
    })
    .catch(err =>
      res.status(400).json({
        error: err,
        message: "Sorry, something went wrong!s Please try again later."
      })
    );
});

module.exports = router;
