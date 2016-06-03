const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const crypto = require('crypto');
const co = require('co');

const utils = require('../utils');
const logger = require('../logger');
const mailer = require('../mailer');
const User = mongoose.model('User');
const Student = mongoose.model('Student');
const Prof = mongoose.model('Prof');
const University = mongoose.model('University');
const Program = mongoose.model('Program');

var router = express.Router();



router.get('/', passport.authenticate('jwt', {session: false}), function (req, res) {
  co(function *() {
    var user = yield User.findOne({ _id: req.user._id })
                      .populate([{
                        path: 'universities',
                        select: 'id name',
                      }, {
                        path: 'programs',
                        select: 'id name university degree',
                      }]);

    if (!user) {
      return res.status(404).json({
        err: [{ msg: 'UserNotFound' }],
      });
    }

    var courseInstances = yield user.getCourseInstances({
      select: 'id prof course semester',
      populate: [{
        path: 'course',
        select: 'name university program',
        populate: [{
          path: 'university',
          select: 'id name',
        }, {
          path: 'program',
          select: 'id name university degree',
        }],
      }, {
        path: 'prof',
        select: 'firstname lastname role universities programs',
        populate: [{
          path: 'universities',
          select: 'name',
        }, {
          path: 'programs',
          select: 'name university degree',
        }],
      }],
      lean: true,
      limit: 5,
    });

    var questions = yield user.getQuestions({
      populate: [{
        path: 'user',
        select: 'id firstname lastname',
      }],
      select: 'id title course user createDate votes',
      lean: true,
      limit: 5,
    });

    var followings = yield user.getFollowings({
      populate: [{
        path: 'program',
        select: 'id name university degree',
      }, {
        path: 'university',
        select: 'id name',
      }, {
        path: 'universities',
        select: 'id name',
      }],
      select: 'id firstname lastname universities programs',
      lean: true,
      limit: 5,
    });

    var data = {
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      bio: user.bio,
      role: user.role,
      courseInstances: courseInstances,
      questions: questions,
      followings: followings,
      universities: user.universities,
      programs: user.programs,
    };

    return res.json(data);

  }).catch(function (err) {
    logger.error(err);
    return res.status(500).json({
      err: [{ msg: 'InternalError' }],
    });
  });
});

router.put('/', passport.authenticate('jwt', {session: false}), function (req, res) {
  if (req.body.firstname) req.checkBody('firstname', 'InvalidFirstname').notEmpty();
  if (req.body.lastname) req.checkBody('lastname', 'InvalidLastname').notEmpty();
  if (req.body.password) req.checkBody('password', 'InvalidPassword').notEmpty();
  if (req.body.bio) req.checkBody('bio', 'InvalidBio').notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      err: errors
    });
  }

  co(function *() {
    var user = yield User.findOne({ _id: req.user._id });

    if (req.body.firstname) user.firstname = req.body.firstname;
    if (req.body.lastname) user.lastname = req.body.lastname;
    if (req.body.bio) user.bio = req.body.bio;
    if (req.body.password) {
      yield user.updatePassword(req.body.password);
    }

    user = yield user.save();
    return res.status(200).json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      bio: user.bio,
    });
  }).catch(function (err) {
    logger.error(err);
    return res.status(500).json({
      err: [{ msg: 'InternalError' }],
    });
  });
});


module.exports = router;
