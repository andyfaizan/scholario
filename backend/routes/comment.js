const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const co = require('co');
const logger = require('../logger');
const utils = require('../utils');
const User = mongoose.model('User');
const Question = mongoose.model('Question');
const Answer = mongoose.model('Answer');
const Comment = mongoose.model('Comment');

var router = express.Router();

router.post('/', passport.authenticate('jwt', {session: false}), function (req, res) {
  req.checkBody('answer', 'InvalidAnswerId').notEmpty().isMongoId();
  req.checkBody('content', 'InvalidContent').notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      err: errors
    });
  }

  co(function *() {
    var answer = yield Answer.findOne({ _id: req.body.answer });
    if (!answer) {
      return res.status(404).json({
        err: [{ msg: 'AnswerNotFound' }],
      });
    }

    var comment = yield Comment({
      content: req.body.content,
      answer: answer,
      user: req.user,
    }).save();

    return res.status(201).json({
      _id: comment._id,
      content: comment.content,
      answer: comment.answer,
      user: comment.user,
      createDate: comment.createDate,
      votes: comment.votes,
    });
  }).catch(function (err) {
    logger.error(err);
    return res.status(500).json({
      err: [{ msg: 'InternalError' }],
    });
  });
});

module.exports = router
