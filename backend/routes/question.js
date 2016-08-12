const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const co = require('co');
const _ = require('lodash');
const logger = require('../logger');
const utils = require('../utils');
const Question = mongoose.model('Question');
const Answer = mongoose.model('Answer');
const CourseInstance = mongoose.model('CourseInstance');
const QuestionCreatedEvent = mongoose.model('QuestionCreatedEvent');
const User = mongoose.model('User');
const mailer = require('../mailer');

var router = express.Router();

router.post('/', passport.authenticate('jwt', { session: false }), function (req, res) {
  req.checkBody('title', 'InvalidTitle').notEmpty();
  req.checkBody('description', 'InvalidDescription').notEmpty();
  req.checkBody('courseInstance', 'InvalidCourseInstance').notEmpty().isMongoId();
  if (req.body.pkg) req.checkBody('pkg', 'InvalidPkg').notEmpty().isMongoId();
  if (req.body.material) req.checkBody('material', 'InvalidMaterial').notEmpty().isMongoId();

  if (!req.body.courseInstance && !req.body.pkg && !req.body.material) {
    return res.status(400).json({
      err: [{ msg: 'InvalidInput' }],
    });
  }


  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      err: errors,
    });
  }

  co(function *() {
    var question = new Question({
      title: req.body.title,
      description: req.body.description,
      user: req.user,
      courseInstance: req.body.courseInstance,
    });
    if (req.body.pkg) question.pkg = req.body.pkg;
    if (req.body.material) question.material = req.body.material;
    question = yield question.save();

    const data = {
      _id: question._id,
      title: question.title,
      description: question.description,
      user: req.user._id,
      courseInstance: question.courseInstance,
      createDate: question.createDate,
      votes: question.votes,
    };
    if (question.pkg) data.pkg = question.pkg;
    if (question.material) data.material = question.material;

    res.json(data);

    const ci = yield CourseInstance.findOne({ _id: req.body.courseInstance }).exec();
    const tos = [];
    _.forEach(ci.participants, (val) => {
      if (val.toString() !== req.user.id) tos.push(val);
    });
    QuestionCreatedEvent({
      to: tos,
      by: req.user,
      question: question,
    }).save();
  }).catch(function (err) {
    logger.error(err);
    return res.status(500).json({
      err: [{ msg: 'InternalError' }],
    });
  });
});

router.get('/', passport.authenticate('jwt', { session: false }), function (req, res) {
  if (req.query.courseInstance) req.checkQuery('courseInstance', 'InvalidCourseInstance').notEmpty().isMongoId();
  if (req.query.pkg) req.checkQuery('pkg', 'InvalidPkg').notEmpty().isMongoId();
  if (req.query.material) req.checkQuery('material', 'InvalidMaterial').notEmpty().isMongoId();

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      err: errors,
    });
  }

  co(function *() {
    var pr;
    var questions;

    if (req.query.material) pr = Question.find({ material: req.query.material });
    else if (req.query.pkg) pr = Question.find({ pkg: req.query.pkg });
    else if (req.query.courseInstance) pr = Question.find({ courseInstance: req.query.courseInstance });
    else {
      const userCis = yield req.user.getCourseInstances();
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
          select: 'name university degree',
        }],
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

router.get('/:qid', passport.authenticate('jwt', { session: false }), function (req, res) {
  req.checkParams('qid', 'Invalid question id').notEmpty().isMongoId();

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      err: errors,
    });
  }

  Question.findOne({ _id: req.params.qid })
    .select('id title description courseInstance pkg material user createDate answers votes bestAnswer approvedAnswer')
    .populate([{/* {*/
      // path: 'courseInstance',
      // select: 'name',
    /* }, */
      path: 'user',
      select: 'firstname lastname universities programs',
      populate: [{
        path: 'universities',
        select: 'name',
      }, {
        path: 'programs',
        select: 'name university degree',
      }],
    }, {
      path: 'answers',
      select: 'content createDate votes user bestAnswer comments',
      populate: [{
        path: 'user',
        select: 'firstname lastname universities programs',
        populate: [{
          path: 'universities',
          select: 'name',
        }, {
          path: 'programs',
          select: 'name university degree',
        }, {
          path: 'comments',
          select: 'content user createDate modifyDate votes',
          populate: [{
            path: 'user',
            select: 'firstname lastname universities programs',
            populate: [{
              path: 'universities',
              select: 'name',
            }, {
              path: 'programs',
              select: 'name university degree',
            }],
          }],
        }],
      }],
    }])
    .lean(true)
    .then(function (question) {
      if (!question) {
        return res.status(404).json({
          err: [{
            msg: 'QuestionNotFound',
          }],
        });
      }
      for (let i = 0; i < question.answers.length; i++) {
        for (let j = 0; j < question.answers[i].comments; j++) {
          question.answers[i].comments[j].answer = question.answers[i]._id;
        }
      }
      return res.status(200).json(question);
    }).catch(function (err) {
      logger.error(err);
      return res.json({
        err: err.message,
      });
    });
});

router.delete('/:qid', passport.authenticate('jwt', { session: false }), function (req, res) {
  req.checkParams('qid', 'InvalidQuestionId').notEmpty().isMongoId();

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      err: errors,
    });
  }

  Question.findOne({ _id: req.params.qid }).then(function (question) {
    if (!question) {
      return res.status(404).json({
        err: [{ msg: 'QuestionNotFound' }],
      });
    }
    if (question.user.toString() !== req.user.id.toString()) {
      return res.status(401).json({
        err: [{ msg: 'PermissionDenied' }],
      });
    }

    return question.remove();
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

router.put('/:qid', passport.authenticate('jwt', { session: false }), function (req, res) {
  req.checkParams('qid', 'InvalidQuestionId').notEmpty().isMongoId();
  if (req.body.title) req.checkBody('title', 'InvalidTitle').notEmpty();
  if (req.body.description) req.checkBody('description', 'InvalidDescription').notEmpty();
  if (req.body.bestAnswer) req.checkBody('bestAnswer', 'InvalidBestAnswerId').notEmpty().isMongoId();
  if (req.body.approvedAnswer) req.checkBody('approvedAnswer', 'InvalidApprovedAnswerId').notEmpty().isMongoId();

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      err: errors,
    });
  }

  co(function *() {
    var question = yield Question.findOne({ _id: req.params.qid });
    if (!question) {
      return res.status(404).json({
        err: [{ msg: 'QuestionNotFound' }],
      });
    }
    if (req.body.approvedAnswer) {
      const courseInstance = yield CourseInstance.findOne({ _id: question.courseInstance });
      if (courseInstance.prof.toString() !== req.user.id.toString()) {
        return res.status(401).json({
          err: [{ msg: 'PermissionDenied' }],
        });
      }
      const approvedAnswer = yield Answer.findOne({ _id: req.body.approvedAnswer });
      if (approvedAnswer) question.approvedAnswer = req.body.approvedAnswer;
      question.save();
      return res.status(200).json({
        _id: question._id,
        approvedAnswer: approvedAnswer._id,
      });
    }

    if (question.user.toString() !== req.user.id.toString()) {
      return res.status(401).json({
        err: [{ msg: 'PermissionDenied' }],
      });
    }

    if (req.body.title) question.title = req.body.title;
    if (req.body.description) question.description = req.body.description;
    if (req.body.bestAnswer) {
      const bestAnswer = yield Answer.findOne({ _id: req.body.bestAnswer });
      if (bestAnswer) question.bestAnswer = req.body.bestAnswer;
    }
    question = yield question.save();

    return res.status(200).json({
      _id: question._id,
      title: question.title,
      description: question.description,
      bestAnswer: question.bestAnswer,
      approvedAnswer: question.approvedAnswer,
    });
  }).catch(function (err) {
    logger.error(err);
    return res.status(500).json({
      err: [{ msg: 'InternalError' }],
    });
  });
});

router.post('/:qid/answers', passport.authenticate('jwt', { session: false }), function (req, res) {
  // req.checkBody('question', 'Invalide question').notEmpty().isMongoId();
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

  Question.findOne({ _id: req.params.qid }).then(function (question) {
    if (!question) {
      return res.status(404).json({
        err: [{ msg: 'QuestionNotFound' }],
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
      err: [{ msg: 'InternalError' }],
    });
  });
});

router.get('/:qid/vote', passport.authenticate('jwt', { session: false }), function (req, res) {
  co(function *() {
    const question = yield Question.findOne({ _id: req.params.qid })
      .populate([{
        path: 'courseInstance',
        select: 'participants prof',
        populate: [{
          path: 'prof',
          select: 'email',
        }],
      }]);

    if (!question) {
      return res.status(404).json({
        err: [{ msg: 'QuestionNotFound' }],
      });
    }

    for (let i = 0; i < question.votes.length; i++) {
      if (question.votes[i].user.toString() === req.user.id.toString()) {
        return res.json({
          _id: question._id,
          votes: question.votes,
        });
      }
    }
    question.votes.push({ user: req.user._id, voteDate: Date.now() });
    question.save();

    if ((question.infoMailSended === 'false') &&
    (question.votes.length / question.courseInstance.participants.length) >= 0.05) {
      question.infoMailSended = 'true';
      question.save();

      const topRatedQuestion = `https://www.scholario.de/question/${question._id}`;
      const mailOpts = {
        from: '"Scholario" <noreply@scholario.de>',
        to: question.courseInstance.prof.email,
        subject: 'Informationmail about Question',
        text: 'Es gibt eine Frage die viele interessiert.\n' + topRatedQuestion,
      };

      mailer.transporter.sendMail(mailOpts).catch(function (err) {
        logger.error(err);
      });
    }

    res.json({
      _id: question._id,
      votes: question.votes,
    });

    // Update stats
    const user = yield User.findOne({ _id: question.user });
    user.updateStats('likesReceived', question.courseInstance._id);
  }).catch(function (err) {
    logger.error(err);
    return res.status(500).json({
      err: [{ msg: 'InternalError' }],
    });
  });
});

router.get('/:qid/:aid/votes', passport.authenticate('jwt', { session: false }), function (req, res) {
  Answer.findOne({ _id: req.params.aid }).then(function (answer) {
    if (!answer) {
      return res.status(404).json({
        err: [{ msg: 'AnswerNotFound' }],
      });
    }

    if (answer.votes.indexOf(req.param.uid) === -1) {
      answer.votes.push(req.params.uid);
      answer.save();
    }
    return res.json({
      err: [],
    });
  }).catch(function (err) {
    return res.json({
      err: [{ msg: err.message }],
    });
  });
});

router.get('/:qid/:aid/bestanswer', passport.authenticate('jwt', { session: false }), utils.hasPermission('Prof'),
  function (req, res) {
    Question
      .findOne({ _id: req.params.qid, answers: { $in: [req.params.aid] } })
      .select('courseInstance answers')
      .populate([{
        path: 'courseInstance',
        select: 'prof',
        populate: {
          path: 'prof',
          select: 'id',
        },
      }, {
        path: 'answers',
        select: 'id bestAnswer',
      }])
      .exec()
      .then(function (question) {
        if (!question) {
          return res.status(404).json({
            err: [{ msg: 'AnswerOrQuestionNotFound' }],
          });
        }

        if (question.courseInstance.prof.id === req.user._id) {
          Answer.findOne({ _id: req.params.aid }).then(function (answer) {
            if (!answer) {
              return res.status(404).json({
                err: [{ msg: 'AnswerNotFound' }],
              });
            }
            answer.bestAnswer = true;
            answer.save();
          });
        }
        return res.json({
          err: [],
        });
      }).catch(function (err) {
        return res.json({
          err: [{ msg: err.message }],
        });
      });
  });


module.exports = router;
