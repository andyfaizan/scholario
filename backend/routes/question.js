const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const logger = require('../logger');
const utils = require('../utils');
const User = mongoose.model('User');
const Question = mongoose.model('Question');

var router = express.Router();



router.post('/', passport.authenticate('jwt', {session: false}), function (req, res) {
  var question = new Question({
    title: req.body.title,
    description: req.body.description,
    course: req.body.course,
    user: req.user,
  });
  question.save();

  return res.json({
    err: '',
  });
});



module.exports = router;