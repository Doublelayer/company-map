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

router.get("/sectors", (req, res) => {
  db.get()
    .collection(process.env.COLLECTION_NAME)
    .distinct("sector")
    .then(sectors => {
      res.json(sectors);
    });
});

router.get("/grouped", (req, res) => {
  db.get()
    .collection(process.env.COLLECTION_NAME)
    .aggregate([{ $group: { _id: "$sector", division: { $addToSet: "$division" } } }])
    .toArray()
    .then(sectors => {
      res.json(sectors);
    });
});

router.post("/division", (req, res) => {
  const { sector } = req.body;

  db.get()
    .collection(process.env.COLLECTION_NAME)
    .distinct("division", { sector: { $in: sector } })
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

router.post("/find-by-sector-and-division", (req, res) => {
  const { city, sector, division } = req.body;

  db.get()
    .collection(process.env.COLLECTION_NAME)
    .find({ sector: { $in: sector }, division: { $in: division }, city: city })
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

module.exports = router;
