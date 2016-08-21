const express = require('express');
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const url = require('url');
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

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      err: errors,
    });
  }

  co(function *() {
    let user = yield User.findOne({ email: req.body.email })
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
    user = yield user.authenticate(req.body.password);

    const token = jwt.sign({ sub: user.email, role: user.role }, config.secret, {
      expresInMinutes: 1440,
    });

    const data = {
      user: {
        token: token,
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role,
        universities: user.universities,
        programs: user.programs,
      },
    };

    if (user.avatarPath) {
      const avatarName = path.basename(user.avatarPath);
      const avatarUrl = url.format({
        protocol: 'http',
        slashes: true,
        host: 'uploads.scholario.de',
        pathname: `/users/${user._id}/photos/${avatarName}`,
      });
      data.avatarUrl = avatarUrl;
    }

    return res.json(data);
  }).catch(function (err) {
    if (err.message === 'User/Password incorrect.') {
      return res.status(401).json({
        err: [{
          msg: 'UserOrPassIncorrect',
        }],
      });
    }

    logger.error(err);
    return res.status(500).json({
      err: [{
        msg: 'InternalError',
      }],
    });
  });
});

router.post('/forgot-password', function (req, res) {
  req.checkBody('email', 'Invalid email').notEmpty().isEmail();

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      err: errors,
    });
  }

  User.findOne({ email: req.body.email }).then(function (user) {
    if (!user) {
      return res.json({
        err: [{ msg: ' Email is wrong.' }],
      });
    }

    const buffer = crypto.randomBytes(48);
    const verificationCode = buffer.toString('hex');
    user.verificationCode = verificationCode;
    user.vcCreated = Date.now();
    const verificationURL = `http://scholario.de/reset-password/${verificationCode}`;
    const mailOpts = {
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
  }).then(function () {
    return res.status(200).json({
    });
  }).catch(function (err) {
    logger.error(err);
    return res.status(500).json({
      err: [{ msg: 'InternalError' }],
    });
  });
});

router.post('/reset-password/:code', function (req, res) {
  req.checkParams('code', 'Invalid code').isLength({ min: 96, max: 96 });
  req.checkBody('password', 'Invalid password').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      err: errors,
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
    }).then(function () {
      return res.status(200).json({
        err: '',
      });
    }).catch(function (err) {
      logger.error(err);
      return res.status(500).json({
        err: [{ msg: 'InternalError' }],
      });
    });
  }).catch(function (err) {
    logger.error(err);
    return res.status(500).json({
      err: [{ msg: 'InternalError' }],
    });
  });
});

module.exports = router;
