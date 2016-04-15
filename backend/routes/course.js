const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const logger = require('../logger');
const utils = require('../utils');
const User = mongoose.model('User');
const Course = mongoose.model('Course');
const Question = mongoose.model('Question');

var router = express.Router();



router.get('/:cid', passport.authenticate('jwt', {session: false}), function (req, res) {
  req.checkParams('cid', 'Invalid course id').notEmpty().isMongoId();

  var errors = req.validationErrors();
  if (errors) {
    return res.json({
      'err': errors
    });
  }

  Course.findOne({ _id: req.params.cid }).populate('prof university').then(function (course) {
    if (!course) {
      return res.json({
        err: 'Course not found.',
      });
    }
    return res.json({
      name: course.name,
      prof: course.prof.name,
      university: course.university.name,
    });
  }).catch(function (err) {
    return res.json({
      err: err.message,
    });
  });
});

router.get('/:cid/questions', passport.authenticate('jwt', {session: false}), function (req, res) {
  req.checkParams('cid', 'Invalid course id').notEmpty().isMongoId();

  var errors = req.validationErrors();
  if (errors) {
    return res.json({
      'err': errors
    });
  }

  Course.findOne({ _id: req.params.cid }).then(function (course) {
    if (!course) {
      return res.json({
        err: 'Course not found.',
      });
    }
    Question.find({ course: course._id }).then(function (questions) {
      var data = [];
      for(var i = 0; i < questions.length; i++) {
        data.push({
          id: questions[i]._id,
          title: questions[i].title,
          description: questions[i].description,
          user: questions[i].user,
          createDate: questions[i].createDate,
        });
      }
      return res.json({questions: data});
    });
  });
});

// we have to upgreat the course/following part, to make sure there is no double following in the course.

router.get('/:cid/follow', passport.authenticate('jwt', {session: false}), utils.hasPermission('Student'), function (req, res) {
  req.checkParams('cid', 'Invalid course id').notEmpty().isMongoId();

  var errors = req.validationErrors();
  if (errors) {
    return res.json({
      'err': errors
    });
  }

  Course.findOne({ _id: req.params.cid }).then(function (course) {
    if (!course) {
      return res.json({
        err: 'Course not found.',
      });
    }

    if (req.course.participants.indexOf(req.user._id) === -1)      // proof is the != korrekt?
      req.course.participants.push(req.user._id);
      req.course.save();
      return res.json({
        err: [],
      });
    }).catch(function (err) {
    return res.json({
      err: [{'msg': err.message}],
    });
  });
});
    


router.get('/:cid/unfollow', passport.authenticate('jwt', {session: false}), utils.hasPermission('Student'), function (req, res) {
  req.checkParams('cid', 'Invalid course id').notEmpty().isMongoId();

  var errors = req.validationErrors();
  if (errors) {
    return res.json({
      'err': errors
    });
  }

  Course.findOne({ _id: req.params.cid }).then(function (course) {
    if (!course) {
      return res.json({
        err: 'Course not found.',
      });
    }

    if (req.course.participants.indexOf(req.user._id) != -1)      // proof is the == korrekt?
      req.course.participants.pull(req.user._id);
      req.course.save();
      return res.json({
        err: [],
      });
    }).catch(function (err) {
    return res.json({
      err: [{'msg': err.message}],
    });
  });
});

//==============

router.post('/', passport.authenticate('jwt', {session: false}),
            utils.hasPermission('Prof'), function (req, res) {
  req.checkBody('name', 'Invalid name').notEmpty().isAlphanumeric();


  var errors = req.validationErrors();
  if (errors) {
    return res.json({
      'err': errors
    });
  }

  var course = new Course({
    name: req.body.name,
    prof: req.user,
    university: req.user.university,
  });
  course.save();

  var materialsRoot = path.join(path.dirname(__dirname), 'uploads', 'courses', course.id);
  logger.debug(materialsRoot);
  fs.mkdir(materialsRoot, 0755, function (err, dir) {
    if (err) {
      return res.json({
        err: [{'msg': err.message}],
      });
    }
    course.materialsRoot = materialsRoot;
    course.save();
    return res.json({
      err: [],
    });
  });
});


module.exports = router;
