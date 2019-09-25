const express = require('express');

const post = require('./post');
const get = require('./get');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/post', post);
router.use('/get', get);

module.exports = router;
