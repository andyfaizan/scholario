const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const logger = require('../logger');
const utils = require('../utils');
const User = mongoose.model('User');
const Course = mongoose.model('Course');
const Question = mongoose.model('Question');
const Material = mongoose.model('Material');

var router = express.Router();



router.get('/:cid', passport.authenticate('jwt', {session: false}), function (req, res) {
  req.checkParams('cid', 'Invalid course id').notEmpty().isMongoId();

  var errors = req.validationErrors();
  if (errors) {
    return res.json({
      'err': errors
    });
  }

  Course.findOne({ _id: req.params.cid }).populate('prof university').then(function (course) {
    if (!course) {
      return res.json({
        err: 'Course not found.',
      });
    }
    return res.json({
      name: course.name,
      prof: course.prof.name,
      university: course.university.name,
    });
  }).catch(function (err) {
    return res.json({
      err: err.message,
    });
  });
});

router.get('/:cid/questions', passport.authenticate('jwt', {session: false}), function (req, res) {
  req.checkParams('cid', 'Invalid course id').notEmpty().isMongoId();

  var errors = req.validationErrors();
  if (errors) {
    return res.json({
      'err': errors
    });
  }

  Course.findOne({ _id: req.params.cid }).then(function (course) {
    if (!course) {
      return res.json({
        err: 'Course not found.',
      });
    }
    Question.find({ course: course._id }).then(function (questions) {
      var data = [];
      for(var i = 0; i < questions.length; i++) {
        data.push({
          id: questions[i]._id,
          title: questions[i].title,
          description: questions[i].description,
          user: questions[i].user,
          createDate: questions[i].createDate,
        });
      }
      return res.json({questions: data});
    });
  });
});

/**
 * @api {get} /courses/:cid/follow Follow a course
 * @apiVersion 0.1.0
 * @apiPermission student
 * @apiName FollowCourse
 * @apiGroup Course
 *
 * @apiParam {String} cid Course ID
 *
 * @apiError (404) CourseNotFound Course not found
 * @apiError (400) InvalidID ID was not valid
 * @apiError (500) InternalError Internal error
 *
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Bad Request
 *     {
 *       "err": [{
 *         "msg": "CourseNotFound",
 *       }]
 *     }
 *
 */
router.get('/:cid/follow',
           passport.authenticate('jwt', {session: false}),
           utils.hasPermission('Student'), function (req, res) {
  req.checkParams('cid', 'InvalidID').notEmpty().isMongoId();

  var errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      'err': errors
    });
  }

  Course.findOne({ _id: req.params.cid }).then(function (course) {
    if (!course) {
      return res.status(404).json({
        err: [{msg: 'CourseNotFound'}],
      });
    }

    if (req.course.participants.indexOf(req.user._id) === -1)      // proof is the != korrekt?
      req.course.participants.push(req.user._id);
      req.course.save();
      return res.json({
        err: [],
      });
    }).catch(function (err) {
    return res.json({
      err: [{'msg': err.message}],
    });
  });
});
    


router.get('/:cid/unfollow', passport.authenticate('jwt', {session: false}), utils.hasPermission('Student'), function (req, res) {
  req.checkParams('cid', 'Invalid course id').notEmpty().isMongoId();

  var errors = req.validationErrors();
  if (errors) {
    return res.json({
      'err': errors
    });
  }

  Course.findOne({ _id: req.params.cid }).then(function (course) {
    if (!course) {
      return res.json({
        err: 'Course not found.',
      });
    }

    if (req.course.participants.indexOf(req.user._id) != -1)      // proof is the == korrekt?
      req.course.participants.pull(req.user._id);
      req.course.save();
      return res.json({
        err: [],
      });
    }).catch(function (err) {
    return res.json({
      err: [{'msg': err.message}],
    });
  });
});

router.get('/:cid/materials', passport.authenticate('jwt', {session: false}), function (req, res) {
  req.checkParams('cid', 'Invalid course id').notEmpty().isMongoId();

  var errors = req.validationErrors();
  if (errors) {
    return res.json({
      'err': errors
    });
  }

  Material.find({ course: req.params.cid }).populate('owner').then(function (materials) {
    if (!materials) {
      return res.status(404).json({
        err: [{msg: 'Materials not found'}],
      });
    }
    var data = [];
    for (var i = 0; i < materials.length; i++) {
      data.push({
        id: materials[i].id,
        name: materials[i].name,
        createdBy: {
          id: materials[i].owner.id,
          name: materials[i].owner.name,
        },
      });
    }
    return res.json({
      'materials': data,
    });
  }).catch(function (err) {
    logger.error(err.message);
    return res.status(500).json({
      err: [{msg: 'Sorry, there was an error, please try again'}],
    });
  });
});

/**
 * @api {post} /courses Create new course
 * @apiVersion 0.1.0
 * @apiPermission prof
 * @apiName PostCourse
 * @apiGroup Course
 *
 * @apiParam {String} name Name of the course
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *       "err": [],
 *     }
 *
 * @apiError (400) InvalidName Name was not valid
 * @apiError (500) InternalError Internal error
 *
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "err": [{
 *         "param": "name",
 *         "msg": "InvalidName",
 *         "value": "My^^ugly |\|@me"
 *       }]
 *     }
 *
 */
router.post('/', passport.authenticate('jwt', {session: false}),
            utils.hasPermission('Prof'), function (req, res) {
  req.checkBody('name', 'InvalidName').notEmpty().isAlphanumeric();


  var errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      'err': errors
    });
  }

  var course = new Course({
    name: req.body.name,
    prof: req.user,
    university: req.user.university,
  });
  course.save();

  var materialsRoot = path.join(path.dirname(__dirname), 'uploads', 'courses', course.id);
  logger.debug(materialsRoot);
  fs.mkdir(materialsRoot, 0755, function (err, dir) {
    if (err) {
      logger.error(err.message);
      return res.status(500).json({
        err: [{msg: 'InternalError'}],
      });
    }
    course.materialsRoot = materialsRoot;
    course.save();
    return res.json({
      err: [],
    });
  });
});


module.exports = router;
