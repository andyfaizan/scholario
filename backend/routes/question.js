const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const logger = require('../logger');
const utils = require('../utils');
const User = mongoose.model('User');
const Question = mongoose.model('Question');
const Answer = mongoose.model('Answer');

var router = express.Router();



router.post('/', passport.authenticate('jwt', {session: false}), function (req, res) {
  req.checkBody('title', 'Invalid title').notEmpty();
  req.checkBody('course', 'Invalid course').notEmpty().isMongoId();

  var errors = req.validationErrors();
  if (errors) {
    return res.json({
      'err': errors
    });
  }

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

router.get('/:qid', passport.authenticate('jwt', {session: false}), function (req, res) {
  req.checkParams('qid', 'Invalid question id').notEmpty().isMongoId();

 var errors = req.validationErrors();
  if (errors) {
    return res.json({
      'err': errors
    });
  }

  Question.findOne({ _id: req.params.qid})
    .select('id title description course user createDate answers votes')
        .populate([{
          path: 'course',
          select: 'name',
        }, {
          path: 'user',
          select: 'firstname lastname',
        }, {
          path: 'answers',
            select: 'content createDate votes user',
                populate: {
                  path: 'user',
                  select: 'firstname lastname',
                }
        }])
        .lean(true)
        .then( function(question) {
    if (!question) {
      return res.status(404).json({
        err: [{
          msg: 'QuestionNotFound',
        }]
      });
    }
    return res.status(200).json(question);
  }).catch(function (err) {
    logger.error(err)
    return res.json({
      err: err.message,
    });
  });
});

 
/**
router.post('/:qid/answers', passport.authenticate('jwt', {session: false}), function (req, res) {
  req.checkBody('question', 'Invalide question').notEmpty().isMongoId();
  req.checkBody('content', 'Invalid content').notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    return res.json({
      'err': errors
    });
  }

  var answer = new Answer({
    content: req.body.content,
    question: req.body._qid,
    user: req.user,
  });
  answer.save();

  

  return res.json({
    err: '',
  });
});
**/
router.post('/:qid/answers', passport.authenticate('jwt', {session: false}), function (req, res) {
  //req.checkBody('question', 'Invalide question').notEmpty().isMongoId();
  req.checkBody('content', 'Invalid content').notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    return res.json({
      'err': errors
    });
  }

  var answer = new Answer({
    content: req.body.content,
    //question: req.params.qid,
    user: req.user,
  });
  answer.save();

  Question.findOne({ _id: req.params.qid }).then(function (question) {
    if (!question) {
      return res.status(404).json({
        err: [{msg: 'QuestionNotFound'}],
      });
    }

    question.answers.push(answer._id);
    question.save();
    return res.json({
      err: [],
    });
  }).catch(function (err) {
    logger.error(err);
    return res.json({
      err: [{'msg': 'InternalError'}],
    });
  });
});

router.get('/:qid/votes', passport.authenticate('jwt', {session: false}), function (req, res) {
  Question.findOne({ _id: req.params.qid }).then(function (question) {
    if (!question) {
      return res.status(404).json({
        err: [{msg: 'QuestionNotFound'}],
      });
    }

    if(question.votes.indexOf(req.param.uid) === -1) {
      question.votes.push(req.params.uid);
      question.save();
    }
    return res.json({
      err: [],
    });
  }).catch(function (err) {
    return res.json({
      err: [{'msg': err.message}],
    });
  });
});

router.get('/:qid/:aid/votes', passport.authenticate('jwt', {session: false}), function (req, res) {
  Answer.findOne({ _id: req.params.aid}).then(function (answer) {
    if (!answer) {
      return res.status(404).json({
        err: [{msg: 'AnswerNotFound'}],
      });
    }

    if(answer.votes.indexOf(req.param.uid) === -1) {
      answer.votes.push(req.params.uid);
      answer.save();
    }
    return res.json({
      err: [],
    });
  }).catch(function (err) {
    return res.json({
      err: [{'msg': err.message}],
    });
  });
});

module.exports = router;
