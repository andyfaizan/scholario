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



router.post('/', passport.authenticate('jwt', {session: false}), function (req, res) {
  req.checkBody('title', 'InvalidTitle').notEmpty().isAscii();
  req.checkBody('description', 'InvalidDescription').notEmpty().isAscii();
  req.checkBody('courseInstance', 'InvalidCourseInstance').notEmpty().isMongoId();
  if (req.body.pkg) req.checkBody('pkg', 'InvalidPkg').notEmpty().isMongoId();
  if (req.body.material) req.checkBody('material', 'InvalidMaterial').notEmpty().isMongoId();

  if (!req.body.courseInstance && !req.body.pkg && !req.body.material) {
    return res.status(400).json({
      err: [{ msg: 'InvalidInput' }],
    });
  }

  var errors = req.validationErrors();
  if (errors) {
    return res.json({
      'err': errors
    });
  }

  var question = new Question({
    title: req.body.title,
    description: req.body.description,
    user: req.user,
    courseInstance: req.body.courseInstance,
  });
  if (req.body.pkg) question.pkg = req.body.pkg;
  if (req.body.material) question.material = req.body.material;
  question.save();

  return res.json({
    err: [],
  });
});

router.get('/', passport.authenticate('jwt', {session: false}), function (req, res) {
  if (req.query.courseInstance) req.checkQuery('courseInstance', 'InvalidCourseInstance').notEmpty().isMongoId();
  if (req.query.pkg) req.checkQuery('pkg', 'InvalidPkg').notEmpty().isMongoId();
  if (req.query.material) req.checkQuery('material', 'InvalidMaterial').notEmpty().isMongoId();

  var errors = req.validationErrors();
  if (errors) {
    return res.json({
      'err': errors
    });
  }

  co(function *() {
    var pr;
    if (req.query.material) pr = Question.find({ material: req.query.material });
    else if (req.query.pkg) pr = Question.find({ pkg: req.query.pkg });
    else if (req.query.courseInstance) pr = Question.find({ courseInstance: req.query.courseInstance });
    else {
      var userCis = yield req.user.getCourseInstances();
      pr = Question.find({ courseInstance: { $in: userCis } });
    }

    questions = yield pr
      .select('title description courseInstance pkg material user createDate votes')
      .populate([{
        path: 'user',
        select: 'firstname lastname role universities programs',
        populate: [{
          path: 'universities',
          select: 'name',
        }, {
          path: 'programs',
          select: 'name university',
        }]
      }])
      .sort({ createDate: -1 })
      .lean(true)
      .exec();

    return res.json({
      questions,
    });
  }).catch(function (err) {
    logger.error(err);
    return res.status(500).json({
      err: [{ msg: 'InternalError' }],
    });
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
        .populate([/*{*/
          //path: 'courseInstance',
          //select: 'name',
        /*}, */{
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
