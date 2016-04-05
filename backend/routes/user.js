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

//================new==================
router.get('/:username/follow', passport.authenticate('jwt', {session: false}), function (req, res) {
  User.findOne({ username: req.param.username }).then(function (user) {
    if (!user) throw(Error('User not found'));
    req.user.friends.push(user._id);
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

/*router.get('/', passport.authenticate('jwt', {session: false}), function (req, res) {
  user.friends.findOne({ username: req.params.username }).then(function (user) {
    if (!user.friends) throw(Error('No friends'));
    return res.json({
      user.friends

router.get('/', passport.authenticate('jwt', {session: false}), function (req, res) {
  for(var i = 0; i < user.friends.length; i++)
    if( user.friends[i]._id == req.param.username.
return res.json({
    username: req.user.username,
  });
});
*/

//================new end==============
router.post('/', function (req, res) {
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
