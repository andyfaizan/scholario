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
      user: req.user,
    }).save();
    answer.comments.push(comment);
   // answer = yield answer.push();     

    return res.status(201).json({
      _id: comment._id,
      content: comment.content,
      answer: {
        _id: answer._id,
        comments: answer.comments,
      },
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

router.delete('/:cmid', passport.authenticate('jwt', {session: false}), function (req, res) {
  req.checkParams('cmid', 'InvalidCommentId').notEmpty().isMongoId();

  var errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      err: errors
    });
  }

  Comment.findOne({ _id: req.params.cmid }).then(function (comment) {
    if (!comment) {
      return res.status(404).json({
        err: [{ msg: 'CommentNotFound' }],
      });
    }

    if (comment.user.toString() !== req.user.id.toString()) {
      return res.status(401).json({
        err: [{ msg: 'PermissionDenied' }],
      });
    }
    return comment.remove();

  }).then(function () {
    return res.status(200).json({
    });
  }).catch(function (err) {
    logger.error(err);
    return res.status(500).json({
      err: [{ msg: 'InternalError' }],
    });
  });
});
module.exports = router
