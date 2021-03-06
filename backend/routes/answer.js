const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const co = require('co');
const logger = require('../logger');
const Question = mongoose.model('Question');
const Answer = mongoose.model('Answer');
const AnswerCreatedEvent = mongoose.model('AnswerCreatedEvent');
const User = mongoose.model('User');

var router = express.Router();

router.get('/:aid/vote', passport.authenticate('jwt', { session: false }), function (req, res) {
  req.checkParams('aid', 'InvalidAnswerId').notEmpty().isMongoId();

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      err: errors,
    });
  }

  co(function *() {
    const answer = yield Answer.findOne({ _id: req.params.aid });
    if (!answer) {
      return res.status(404).json({
        err: [{ msg: 'AnswerNotFound' }],
      });
    }

    for (let i = 0; i < answer.votes.length; i++) {
      if (answer.votes[i].user.toString() === req.user.id.toString()) {
        return res.json({
          _id: answer._id,
          votes: answer.votes,
        });
      }
    }

    answer.votes.push({ user: req.user._id, voteDate: Date.now() });
    answer.save();

    res.json({
      _id: answer._id,
      votes: answer.votes,
    });

    // Update stats
    const question = yield Question.findOne({ answers: { $in: [answer] } });
    const user = yield User.findOne({ _id: answer.user });
    user.updateStats('likesReceived', question.courseInstance);
  }).catch(function (err) {
    return res.json({
      err: [{ msg: err.message }],
    });
  });
});

router.post('/', passport.authenticate('jwt', { session: false }), function (req, res) {
  req.checkBody('question', 'Invalide question').notEmpty().isMongoId();
  req.checkBody('content', 'Invalid content').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      err: errors,
    });
  }

  const answer = new Answer({
    content: req.body.content,
    // question: req.params.qid,
    user: req.user,
  });
  answer.save();

  Question.findOne({ _id: req.body.question }).populate('answers').then(function (question) {
    if (!question) {
      return res.status(404).json({
        err: [{ msg: 'QuestionNotFound' }],
      });
    }

    question.answers.push(answer);
    return question.save();
  }).then(function (question) {
    AnswerCreatedEvent({
      to: [question.user],
      by: req.user,
      question: question,
      answer: answer,
    }).save();

    res.status(201).json({
      _id: question._id,
      answers: question.answers,
    });

    // Update stats
    req.user.updateStats('questionsAnswered', question.courseInstance);
  }).catch(function (err) {
    logger.error(err);
    return res.json({
      err: [{ msg: 'InternalError' }],
    });
  });
});

router.delete('/:aid', passport.authenticate('jwt', { session: false }), function (req, res) {
  req.checkParams('aid', 'InvalidAnswerId').notEmpty().isMongoId();

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      err: errors,
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

router.put('/:aid', passport.authenticate('jwt', { session: false }), function (req, res) {
  req.checkParams('aid', 'InvalidAnswerId').notEmpty().isMongoId();
  if (req.body.content) req.checkBody('content', 'InvalidContent').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      err: errors,
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

    answer.content = req.body.content;

    return answer.save();
  }).then(function (answer) {
    return res.status(200).json({
      _id: answer._id,
      content: answer.content,
    });
  }).catch(function (err) {
    logger.error(err);
    return res.status(500).json({
      err: [{ msg: 'InternalError' }],
    });
  });
});


module.exports = router;
