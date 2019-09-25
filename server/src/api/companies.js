const express = require("express");

const router = express.Router();

const db = require("../database");

router.post("/city", (req, res) => {
  const { city } = req.body;

  db.get()
    .collection(process.env.COLLECTION_NAME)
    .find({ city: city })
    .toArray()
    .then(companies => {
      res.status(200).json(companies);
    })
    .catch(err =>
      res.status(400).json({
        error: err,
        message: "Sorry, something went wrong!s Please try again later."
      })
    );
});

router.post("/findbysectors", (req, res) => {
  const { city, sectors } = req.body;

  db.get()
    .collection(process.env.COLLECTION_NAME)
    .find({ branche: { $in: sectors }, city: city })
    .toArray()
    .then(companies => {
      res.status(200).json(companies);
    })
    .catch(err =>
      res.status(400).json({
        error: err,
        message: "Sorry, something went wrong!s Please try again later."
      })
    );
});

router.get("/sectors", (req, res) => {
  db.get()
    .collection(process.env.COLLECTION_NAME)
    .distinct("branche")
    .then(sectors => {
      res.json(sectors);
    });
});

module.exports = router;
