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



router.get('/:username', passport.authenticate('jwt', {session: false}), function (req, res) {
  User.findOne({ username: req.params.username }).then(function (user) {
    if (!user) throw(Error('User not found'));
    return res.json({
      name: user.name,
      username: user.username
    });
  }).catch(function (err) {
    return res.json({
      err: err.message,
    });
  });
});

router.get('/:uid/follow', passport.authenticate('jwt', {session: false}), function (req, res) {
  User.findOne({ _id: req.user._id }).then(function (user) {
    if (!user) throw(Error('User not found'));
    if (req.user.following.indexOf(req.params.uid) === -1) {
      req.user.following.push(req.params.uid);
      req.user.save();
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

router.get('/:uid/unfollow', passport.authenticate('jwt', {session: false}), function (req, res) {
  User.findOne({ _id: req.user._id }).then(function (user) {
    if (!user) throw(Error('User not found'));
    if (req.user.following.indexOf(req.params.uid) != -1) {
      req.user.following.pull(req.params.uid);
      req.user.save();
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

/**
 * @api {post} /users Create new user
 * @apiVersion 0.1.0
 * @apiPermission none
 * @apiName PostUser
 * @apiGroup User
 *
 * @apiParam {String} email Email
 * @apiParam {String} password Password
 * @apiParam {String} firstname Firstname
 * @apiParam {String} lastname Lastname
 * @apiParam {String="student","prof"} role Role
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *       "err": [],
 *     }
 *
 * @apiError (400) EmailExists Email already exists
 * @apiError (400) InvalidEmail Email was not valid
 * @apiError (400) InvalidPassword Password was not valid
 * @apiError (400) InvalidRole Role was not valid
 * @apiError (500) InternalError Internal error
 *
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
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Found
 *     {
 *       "err": [{ "msg": "EmailExists" }]
 *     }
 *
 */
router.post('/', function (req, res) {
  req.checkBody('email', 'InvalidEmail').notEmpty().isEmail();
  req.checkBody('role', 'InvalidRole').isIn(['student', 'prof']);
  req.checkBody('password', 'InvalidPassword').notEmpty();
  req.checkBody('firstname', 'InvalidFirstName').notEmpty();
  req.checkBody('lastname', 'InvalidLastName').notEmpty();
  req.checkBody('university', 'InvalidUniversity').notEmpty().isMongoId();
  req.checkBody('program', 'InvalidProgram').notEmpty().isMongoId();

  var errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      err: errors
    });
  }

  co(function *() {
    var university = yield University.findOne({ _id: req.body.university });
    if (!university) {
      return res.status(404).json({
        err: [{ msg: 'UniversityNotFound' }],
      });
    }
    var program = yield Program.findOne({ _id: req.body.program });
    if (!program) {
      return res.status(404).json({
        err: [{ msg: 'ProgramNotFound' }],
      });
    }
    if (program.university.toString() !== university._id.toString()) {
      return res.status(400).json({
        err: [{ msg: 'UniversityProgramDontMatch' }],
      });
    }
    if (!req.body.email.split('@')[1].endsWith(university.emailDomain)) {
      return res.status(400).json({
        err: [{ msg: 'EmailNotValid' }],
      });
    }

    var user;
    if (req.body.role === 'student') {
      user = new Student({
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        universities: [req.body.university],
        programs: [req.body.program],
        //username: req.body.username,
      });
    } else if (req.body.role === 'prof') {
      user = new Prof({
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        universities: [req.body.university],
        programs: [req.body.program],
      });
    }

    yield user.updatePassword(req.body.password);
    const buffer = crypto.randomBytes(48);
    var verificationCode = buffer.toString('hex');
    user.verificationCode = verificationCode;
    user.vcCreated = Date.now();
    var verificationURL = `http://scholario.de/email-verification/${verificationCode}`;
    var mailOpts = {
      from: '"Scholario" <noreply@scholario.de>',
      to: user.email,
      subject: 'Verification code',
      text: verificationURL,
    };

    if (utils.getEnv() === 'production') {
      mailer.transporter.sendMail(mailOpts).catch(function (err) {
        logger.error(err);
      });
    } else if (utils.getEnv() === 'development') {
      logger.debug(verificationURL);
    }

    user = yield user.save();
    return res.status(201).json({
      err: [],
    });
  }).catch(function (err) {
    if (err.message.lastIndexOf("E1100", 0) === 0) {
      return res.status(400).json({
        err: [{ msg: 'EmailExists' }],
      });
    } else {
      logger.error(err);
      return res.status(500).json({
        err: [{ msg: 'InternalError' }],
      });
    }
  });
});

module.exports = router;
