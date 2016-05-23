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
const CourseInstance = mongoose.model('CourseInstance');
const Pkg = mongoose.model('Pkg');
const Material = mongoose.model('Material');

var router = express.Router();



router.get('/:aid/vote', passport.authenticate('jwt', {session: false}), function (req, res) {
  req.checkParams('aid', 'InvalidAnswerId').notEmpty().isMongoId();

  var errors = req.validationErrors();
  if (errors) {
    return res.json({
      'err': errors
    });
  }

  Answer.findOne({ _id: req.params.aid }).then(function (answer) {
    if (!answer) {
      return res.status(404).json({
        err: [{ msg: 'AnswerNotFound' }],
      });
    }

    for (var i = 0; i < answer.votes.length; i++) {
      if (answer.votes[i].user.toString() === req.user.id.toString()) {
        return res.json({
          _id: answer._id,
          votes: answer.votes,
        });
      }
    }
    answer.votes.push({ user: req.user._id, voteDate: Date.now() })
    answer.save();

    return res.json({
      _id: answer._id,
      votes: answer.votes,
    });
  }).catch(function (err) {
    return res.json({
      err: [{ msg: err.message }],
    });
  });
});

router.post('/', passport.authenticate('jwt', {session: false}), function (req, res) {
  req.checkBody('question', 'Invalide question').notEmpty().isMongoId();
  req.checkBody('content', 'Invalid content').notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    return res.json({
      err: errors
    });
  }

  var answer = new Answer({
    content: req.body.content,
    //question: req.params.qid,
    user: req.user,
  });
  answer.save();

  Question.findOne({ _id: req.body.question }).populate('answers').then(function (question) {
    if (!question) {
      return res.status(404).json({
        err: [{ msg: 'QuestionNotFound' }],
      });
    }

    question.answers.push(answer._id);
    question.save();
    return res.json({
      _id: question._id,
      answers: question.answers
    });
  }).catch(function (err) {
    logger.error(err);
    return res.json({
      err: [{ msg: 'InternalError' }],
    });
  });
});

router.delete('/:aid', passport.authenticate('jwt', {session: false}), function (req, res) {
  req.checkParams('aid', 'InvalidAnswerId').notEmpty().isMongoId();

  var errors = req.validationErrors();
  if (errors) {
    return res.json({
      err: errors
    });
  }

  Answer.findOne({ _id: req.params.aid }).then(function (answer) {
    if (!answer) {
      return res.status(404).json({
        err: [{ msg: 'AnswerNotFound' }],
      });
    }
    if (answer.user.toString() !== req.user.id.toString()) {
      return res.status(401).json({
        err: [{ msg: 'PermissionDenied' }],
      });
    }

    return answer.remove();
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

router.put('/:aid', passport.authenticate('jwt', {session: false}), function (req, res) {
  req.checkParams('aid', 'InvalidAnswerId').notEmpty().isMongoId();
  req.checkBody('content', 'InvalidContent').notEmpty().isAscii();

  var errors = req.validationErrors();
  if (errors) {
    return res.json({
      err: errors
    });
  }

  Answer.findOne({ _id: req.params.aid }).then(function (answer) {
    if (!answer) {
      return res.status(404).json({
        err: [{ msg: 'AnswerNotFound' }],
      });
    }
    if (answer.user.toString() !== req.user.id.toString()) {
      return res.status(401).json({
        err: [{ msg: 'PermissionDenied' }],
      });
    }

    answer.content = content;

    return answer.save();
  }).then(function (answer) {
    return res.status(200).json({
      content: answer.content,
    });
  }).catch(function (err) {
    logger.error(err);
    return res.status(500).json({
      err: [{ msg: 'InternalError' }],
    });
  });
});


module.exports = router