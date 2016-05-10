const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const co = require('co');
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
                      path: 'university',
                      select: 'id name',
                    }, {
                      path: 'program',
                      select: 'id name university',
                    }, {
                      path: 'universities',
                      select: 'id name',
                    }, {
                      path: 'programs',
                      select: 'id name university',
                    }]);

    if (!user) {
      return res.status(404).json({
        err: [{msg: 'UserNotFound'}],
      });
    }
    user = yield user.authenticate(req.body.password);
    var courses = yield user.getCourses({
      populate: [{
        path: 'university',
        select: 'id name',
      }, {
        path: 'program',
        select: 'id name university',
      }],
      select: 'id name prof university program',
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
      select: 'id firstname lastname university universities program',
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
        courses: courses,
        questions: questions,
        followings: followings,
      },
    };
    var uni;
    var program;
    if (user.role === 'Student') {
      uni = user.university;
      program = user.program;
    } else if (user.role === 'Prof') {
      uni = user.universities[0];
      program = user.programs[0];
    }
    if (uni) data.user.university = uni;
    if (program) data.user.program = program;

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
    return res.json({
      'err': errors
    });
  }

  User.findOne({ 'email': req.body.email }).then(function (user) {
    if (!user) {
      return res.json({
        err: [{'msg': 'Email is wrong.'}],
      });
    }

    var buffer = crypto.randomBytes(48);
    var verificationCode = buffer.toString('hex');
    user.verificationCode = verificationCode;
    user.vcCreated = Date.now();
    var verificationURL = `http://scholario.de/forgot-password/${verificationCode}`;
    var mailOpts = {
      from: '"Scholario" <noreply@scholario.de>',
      to: user.email,
      subject: 'Restart password',
      text: verificationURL,
    };
    /*mailer.transporter.sendMail(mailOpts).catch(function (err) {*/
      //console.log(err);
    /*});*/
    logger.debug(verificationURL);

    return user.save();
  });
});

router.post('/reset-password', function (req, res) {
  req.checkBody('code', 'Invalid code').isLength({min: 48, max: 48});
  req.checkBody('password', 'Invalid password').notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    return res.json({
      'err': errors
    });
  }

  if (!req.body.code) {
    return res.json({
      err: 'Verification code was not provided.',
    });
  }

  User.findOne({ verificationCode: req.params.code }).then(function (user) {
    var timeDiff = moment.duration(moment().diff(moment(user.vcCreated))).asHours();
    if (!user || user.verified || timeDiff > 24) {
      return res.json({
        err: 'Code is not valid.',
      });
    }
    user.verificationCode = '';
    user.updatePassword(req.body.password).then(function () {
      user.save();
      return res.json({
        err: '',
      });
    }).catch(function (err) {
      return res.json({
        err: err.message,
      });
    });;
  });

});

module.exports = router;
