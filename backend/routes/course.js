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

router.get('/:cid/follow',
           passport.authenticate('jwt', {session: false}),
           utils.hasPermission('Student'), function (req, res) {
  Course.findOne({ _id: req.params.cid }).then(function (course) {
    if (!course) {
      return res.json({
        err: 'Course not found.',
      });
    }
    course.participants.push(req.user._id);
    course.save();
    return res.json({
      err: '',
    });
  });
});

router.post('/', passport.authenticate('jwt', {session: false}),
            utils.hasPermission('Prof'), function (req, res) {
  var course = new Course({
    name: req.body.name,
    prof: req.user,
    university: req.user.university,
  });
  course.save();

  return res.json({
    err: '',
  });
});


module.exports = router;
