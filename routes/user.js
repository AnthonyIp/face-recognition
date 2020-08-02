const express = require('express');
const router = express.Router();

const {
          image,
          imageUrl,
      } = require('../controllers/user');

router.put('/image', image);
router.post('/imageUrl', imageUrl);

module.exports = router;
