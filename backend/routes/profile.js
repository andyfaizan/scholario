const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('User');

var router = express.Router();

router.get('/', passport.authenticate('jwt', {session: false}), function (req, res) {
  return res.json({
    username: req.user.username,
  });
});

module.exports = router;
