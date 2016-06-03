const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const co = require('co');
const crypto = require('crypto');
const moment = require('moment');

const utils = require('../utils');
const mailer = require('../mailer');
const config = require('../config/config');
const logger = require('../logger');
const User = mongoose.model('User');

var router = express.Router();



/**
 * @api {post} /auth/login Login and get auth token
 * @apiVersion 0.1.0
 * @apiPermission none
 * @apiName Login
 * @apiGroup Auth
 *
 * @apiParam {String} email Email of the user
 * @apiParam {String} password Password
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "err": [],
 *       "token": "eyJ0eXAiOiJKV1QiLCJ..."
 *     }
 *
 * @apiError (404) UserNotFound The email was not found
 * @apiError (400) InvalidEmail Email was not valid
 * @apiError (400) InvalidPassword Password was not valid
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "err": [{ "msg": "User was not found" }]
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "err": [{
 *         "param": "email",
 *         "msg": "InvalidEmail",
 *         "value": "myEmail@"
 *       }]
 *     }
 *
 */
router.post('/login', function (req, res) {
  req.checkBody('email', 'InvalidEmail').notEmpty().isEmail();
  req.checkBody('password', 'InvalidPassword').notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      'err': errors
    });
  }

  co(function *() {
    var user = yield User.findOne({ 'email': req.body.email })
                    .populate([{
                      path: 'universities',
                      select: 'id name',
                    }, {
                      path: 'programs',
                      select: 'id name university degree',
                    }]);

    if (!user) {
      return res.status(404).json({
        err: [{msg: 'UserNotFound'}],
      });
    }
    user = yield user.authenticate(req.body.password);
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

    var token = jwt.sign({'sub': user.email, 'role': user.role}, config.secret, {
      expresInMinutes: 1440
    });

    var data = {
      user: {
        token: token,
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role,
        courseInstances: courseInstances,
        questions: questions,
        followings: followings,
        universities: user.universities,
        programs: user.programs,
      },
    };

    return res.json(data);
  }).catch(function (err) {
    if (err.message === 'User/Password incorrect.') {
      return res.status(401).json({
        err: [{
          msg: 'UserOrPassIncorrect'
        }]
      });
    } else {
      logger.error(err);
      return res.status(500).json({
        err: [{
          msg: 'InternalError',
        }]
      });
    }
  });
});

router.post('/forgot-password', function (req, res) {
  req.checkBody('email', 'Invalid email').notEmpty().isEmail();

  var errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      err: errors
    });
  }

  User.findOne({ 'email': req.body.email }).then(function (user) {
    if (!user) {
      return res.json({
        err: [{ msg: 'Email is wrong.'}],
      });
    }

    var buffer = crypto.randomBytes(48);
    var verificationCode = buffer.toString('hex');
    user.verificationCode = verificationCode;
    user.vcCreated = Date.now();
    var verificationURL = `http://scholario.de/reset-password/${verificationCode}`;
    var mailOpts = {
      from: '"Scholario" <noreply@scholario.de>',
      to: user.email,
      subject: 'Restart password',
      text: verificationURL,
    };

    if (utils.getEnv() === 'production') {
      mailer.transporter.sendMail(mailOpts).catch(function (err) {
        logger.error(err);
      });
    } else if (utils.getEnv() === 'development') {
      logger.debug(verificationURL);
    }

    return user.save();
  }).then(function (user) {
    return res.status(200).json({
    });
  }).catch(function (err) {
    logger.error(err);
    return res.status(500).json({
      err: [{ msg: 'InternalError' }],
    })
  });
});

router.post('/reset-password/:code', function (req, res) {
  req.checkParams('code', 'Invalid code').isLength({min: 96, max: 96});
  req.checkBody('password', 'Invalid password').notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      err: errors
    });
  }

  User.findOne({ verificationCode: req.params.code }).then(function (user) {
    var timeDiff = moment.duration(moment().diff(moment(user.vcCreated))).asHours();
    if (!user || timeDiff > 24) {
      return res.status(400).json({
        err: [{ msg: 'Code is not valid.' }],
      });
    }

    user.verificationCode = '';
    user.updatePassword(req.body.password).then(function () {
      return user.save();
    }).then(function (user) {
      return res.status(200).json({
        err: '',
      });
    }).catch(function (err) {
      logger.error(err);
      return res.status(500).json({
        err: [{ msg: 'InternalError' }],
      });
    });;
  }).catch(function (err) {
    logger.error(err);
    return res.status(500).json({
      err: [{ msg: 'InternalError' }],
    });
  });
});

module.exports = router;
