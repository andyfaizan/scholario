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
                        select: 'id name university',
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
          select: 'id name university',
        }],
      }, {
        path: 'prof',
        select: 'firstname lastname role universities programs',
        populate: [{
          path: 'universities',
          select: 'name',
        }, {
          path: 'programs',
          select: 'name university',
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
        select: 'id name university',
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

module.exports = router;
