const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const logger = require('../logger');
const User = mongoose.model('User');

var router = express.Router();


router.post('/login', function (req, res) {
  req.checkBody('email', 'Invalid email').notEmpty().isEmail();
  req.checkBody('password', 'Invalid password').notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    return res.json({
      'err': errors
    });
  }

  var findP = User.findOne({ 'email': req.body.email });
  var authP = findP.then(function (user) {
    return user.authenticate(req.body.password);
  });
  Promise.all([findP, authP]).then(function (values) {
    var user = values[0];
    var token = jwt.sign({'sub': user.email, 'role': user.role}, config.secret, {
      expresInMinutes: 1440
    });
    return res.json({
      err: [],
      token: token,
    });
  }).catch(function (err) {
    return res.json({
      err: [{
        'msg': err.message,
      }]
    });
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
