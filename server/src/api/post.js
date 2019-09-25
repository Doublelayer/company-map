const express = require('express');

const router = express.Router();

router.post('/search', (req, res) => {
  const { input } = req.body;

  res.send({ message: '👋🌎🌍🌏 from search API!', yourinput: input });
});

module.exports = router;
