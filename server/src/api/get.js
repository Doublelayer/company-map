const express = require('express');

const router = express.Router();

const db = require('../database');

router.get('/from', (req, res) => {
  res.status(200).json({
    message: '👋🌎🌍🌏 from get API! You getting something from the database!'
  });

  // db.get()
  //   .collection(process.env.COLLECTION_NAME)
  //   .find({})
  //   .limit(1)
  //   .toArray()
  //   .then(result => {
  //     res.status(200).json({
  //       message: "👋🌎🌍🌏 from get API! You getting something from the database!",
  //       result: result
  //     });
  //   })
  //   .catch(err =>
  //     res.status(400).json({
  //       error: err,
  //       message: "Sorry, something went wrong!s Please try again later."
  //     })
  //   );
});

module.exports = router;
