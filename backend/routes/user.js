const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const crypto = require('crypto');
const logger = require('../logger');
const mailer = require('../mailer');
const User = mongoose.model('User');
const Student = mongoose.model('Student');
const Prof = mongoose.model('Prof');

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
    req.user.following.push(req.params.uid);
    req.user.save();
    return res.json({
      err: [],
    });
  }).catch(function (err) {
    return res.json({
      err: [{'msg': err.message}],
    });
  });
});

router.post('/', function (req, res) {
  req.checkBody('email', 'Invalid email').notEmpty().isEmail();
  req.checkBody('role', 'Invalid role').isIn(['student', 'prof']);
  req.checkBody('password', 'Invalid password').notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    return res.json({
      'err': errors
    });
  }

  var user;
  if (req.body.role === 'student') {
    user = new Student({
      email: req.body.email,
      username: req.body.username,
    });
  } else if (req.body.role === 'prof') {
    user = new Prof({
      email: req.body.email,
      name: req.body.name,
    });
  }

  user.updatePassword(req.body.password).then(function () {
    return crypto.randomBytes(48);
  }).then(function (buffer) {
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
    /*mailer.transporter.sendMail(mailOpts).catch(function (err) {*/
      //console.log(err);
    /*});*/
    logger.debug(verificationURL);

    return user.save();
  }).then(function (user) {
    return res.json({
      err: ''
    });
  }).catch(function (err) {
    console.log(err);
    return res.json({
      err: err.message,
    });
  });
});

router.put('/', passport.authenticate('jwt', {session: false}), function (req, res) {
  _.forOwn(req.body, function (v, k) {
    req.user.set(k, v);
  });
  req.user.save().then(function (user) {
    return res.json({
      err: '',
    });
  }).catch(function (err) {
    return res.json({
      err: err.message,
    });
  });
});

module.exports = router;
