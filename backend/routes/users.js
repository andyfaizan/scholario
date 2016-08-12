const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
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
const UserFollowedEvent = mongoose.model('UserFollowedEvent');

var router = express.Router();

router.get('/:uid', passport.authenticate('jwt', { session: false }), function (req, res) {
  co(function *() {
    var user = yield User.findOne({ _id: req.params.uid })
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

    const courseInstances = yield user.getCourseInstances({
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

    const followings = yield user.getFollowings({
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

    /* const courseInstanceIds = courseInstances.map(ci => ci._id);
    // console.log(courseInstanceIds);
    const likesReceived = _.fromPairs(courseInstances.map(ci => [ci._id, 0]));
    // console.log(likesReceived);
    const statUserQuestions = yield Question
      .find({ user: user, courseInstance: { $in: courseInstanceIds } })
      .select('id votes')
      .exec();
    // console.log(statUserQuestions);

    const statQuestions = yield Question
      .find({ courseInstance: { $in: courseInstanceIds }, answers: { $exists: true, $not: { $size: 0 } } })
      .select('id courseInstance answers')
      .populate({
        path: 'answers',
        match: { user: user },
      })
      .exec();
    // console.log(statQuestions);

    _.forEach(statUserQuestions, function (question) {
      likesReceived[question.courseInstance] += 1;
    });
    _.forEach(statQuestions, function (question) {
      if (question.answers && question.answers.length > 0) {
        likesReceived[question.courseInstance] += _.sum(question.answers.map(a => a.votes.length));
      }
    });
    console.log(likesReceived);

    const statPkgs = yield Pkg
      .find({ owner: req.user, courseInstance: { $in: courseInstanceIds } })
      .exec();
    const statMaterials = yield Material
      .find({ pkg: { $in: statPkgs } });
    _.forEach(statMaterials, function (material) {
      console.log(material.pkg);
    });
    const answers = yield user.getAnswers();
    const questionsAnswered = yield Question
      .find({ answers: { $in: answers }, courseInstance: { $in: courseInstances } })
      .count();

    const stats = {
      likesReceived: likesReceived,
      materialsUploaded: materialsUploaded,
      questionsAnswered: questionsAnswered,
    }; */

    const data = {
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      bio: user.bio,
      role: user.role,
      courseInstances: courseInstances,
      followings: followings,
      universities: user.universities,
      programs: user.programs,
      stats: user.stats,
    };

    return res.json(data);
  }).catch(function (err) {
    logger.error(err);
    return res.status(500).json({
      err: [{ msg: 'InternalError' }],
    });
  });
});

router.get('/:uid/follow', passport.authenticate('jwt', { session: false }), function (req, res) {
  User.findOne({ _id: req.user._id }).then(function (user) {
    if (!user) throw (Error('User not found'));
    if (req.user.following.indexOf(req.params.uid) === -1) {
      req.user.following.push(req.params.uid);
      req.user.save();
    }
    res.json({
      err: [],
    });

    UserFollowedEvent({
      to: [user],
      by: req.user,
    }).save();
  }).catch(function (err) {
    return res.json({
      err: [{ msg: err.message }],
    });
  });
});

router.get('/:uid/unfollow', passport.authenticate('jwt', { session: false }), function (req, res) {
  User.findOne({ _id: req.user._id }).then(function (user) {
    if (!user) throw (Error('User not found'));
    if (req.user.following.indexOf(req.params.uid) !== -1) {
      req.user.following.pull(req.params.uid);
      req.user.save();
    }
    return res.json({
      err: [],
    });
  }).catch(function (err) {
    return res.json({
      err: [{ msg: err.message }],
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

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      err: errors,
    });
  }

  co(function *() {
    var user;
    var university = yield University.findOne({ _id: req.body.university });
    if (!university) {
      return res.status(404).json({
        err: [{ msg: 'UniversityNotFound' }],
      });
    }
    const program = yield Program.findOne({ _id: req.body.program });
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
    const verificationCode = buffer.toString('hex');
    user.verificationCode = verificationCode;
    user.vcCreated = Date.now();
    const verificationURL = `http://scholario.de/email-verification/${verificationCode}`;
    const mailOpts = {
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
    if (err.message.lastIndexOf('E1100', 0) === 0) {
      return res.status(400).json({
        err: [{ msg: 'EmailExists' }],
      });
    }

    logger.error(err);
    return res.status(500).json({
      err: [{ msg: 'InternalError' }],
    });
  });
});

module.exports = router;
