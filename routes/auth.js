const express = require('express');
const router = express.Router();

const {
          register,
          signIn,
          logout,
          profile,
      } = require('../controllers/auth');

router.post('/register', register);
router.post('/signin', signIn);
router.get('/logout', logout);
router.get('/profile/:id', profile);

module.exports = router;
