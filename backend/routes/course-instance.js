const fs = require('fs');
const path = require('path');
const express = require('express');
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
// const _ = require('lodash');
const co = require('co');
const logger = require('../logger');
const utils = require('../utils');
// const User = mongoose.model('User');
const Course = mongoose.model('Course');
const CourseInstance = mongoose.model('CourseInstance');
const Question = mongoose.model('Question');
const Pkg = mongoose.model('Pkg');
// const Material = mongoose.model('Material');
const University = mongoose.model('University');
const Program = mongoose.model('Program');

var router = express.Router();

router.get('/:cid', passport.authenticate('jwt', { session: false }), function (req, res) {
  req.checkParams('cid', 'InvalidId').notEmpty().isMongoId();

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      err: errors,
    });
  }


//-------------
  CourseInstance
    .findOne({ _id: req.params.cid })
    .populate('following')
    .then(function (course) {
      if (!course) {
        return res.status(404).json({
          err: [{ msg: 'CourseNotFound' }],
        });
      }

      if (course.following.indexOf(req.user._id) === -1) {
        return res.status(401).json({
          err: [{ msg: 'PermissionDenied' }],
        });
      }
    });
//-------------
  co(function *() {
    var course = yield CourseInstance.findOne({ _id: req.params.cid })
      .select('description prof assistants semester course participants')
      .populate([{
        path: 'course',
        select: 'name university program',
        populate: [{
          path: 'university',
          select: 'name',
        }, {
          path: 'program',
          select: 'name university degree',
        }],
      }, {
        path: 'prof',
        select: 'firstname lastname role universities programs',
      }])
      .lean(true)
      .exec();

    if (!course) {
      return res.status(404).json({
        err: [{
          msg: 'CourseNotFound.',
        }],
      });
    }

    const questions = yield Question
      .find({ courseInstance: course._id })
      .select('title description courseInstance user createDate')
      .populate([{
        path: 'user',
        select: 'firstname lastname universities programs',
      }])
      .limit(5)
      .lean(true)
      .exec();

    const pkgs = yield Pkg
      .find({ courseInstance: course._id })
      .select('name owner courseInstance createDate')
      .populate([{
        path: 'owner',
        select: 'firstname lastname universities programs',
        populate: [{
          path: 'universities',
          select: 'name',
        }, {
          path: 'programs',
          select: 'name university degree',
        }],
      }])
      // .limit(5)
      .lean(true)
      .exec();

    course.questions = questions;
    course.pkgs = pkgs;
    course.participantsNum = course.participants.length;
    return res.status(200).json(course);
  }).catch(function (err) {
    logger.error(err);
    return res.json({
      err: err.message,
    });
  });
});

/**
 * @api {get} /courses Search for courses
 * @apiVersion 0.1.0
 * @apiPermission student, prof
 * @apiName GetCourse
 * @apiGroup Course
 *
 * @apiParam {String} q Query
 *
 * @apiError (400) InvalidQuery Query was not valid
 * @apiError (500) InternalError Internal error
 *
 * @apiSuccess {Object[]} courses List of courses
 * @apiSuccess {String} courses.id Course ID
 * @apiSuccess {String} courses.name Course name
 * @apiSuccess {Object} courses.prof Course professor
 * @apiSuccess {String} courses.prof.id Prof ID
 * @apiSuccess {String} courses.prof.name Prof name
 * @apiSuccess {Object} courses.university Course university
 * @apiSuccess {String} courses.university.id Uni ID
 * @apiSuccess {String} courses.university.name Uni name
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "err": [],
 *       "courses": [
 *         {
 *           "id": "5710de30b610a6fd51c63407",
 *           "name": "Intelligent Information Systems",
 *           "university": {
 *             "id": "56fbd94a9b05608e04ab47fd",
 *             "name": "Uni Bonn"
 *           },
 *           "prof": {
 *             "id": "56fbce8be4656b9269ffb6e8"
 *           }
 *         }
 *       ]
 *     }
 *
 */
router.get('/', passport.authenticate('jwt', { session: false }), function (req, res) {
  if (req.query.q) {
    req.checkQuery('q', 'InvalidQuery').notEmpty();
  }

  if (req.query.program) {
    req.checkQuery('program', 'InvalidProgram').notEmpty().isMongoId();
  }

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      err: errors,
    });
  }

  co(function *() {
    var promise;
    if (req.query.q) {
      promise = Course.find({ name: { $regex: req.query.q, $options: 'i' } });
    } else {
      promise = Course.find();
    }

    if (req.query.program) {
      promise.where('program').equals(req.query.program);
    }

    const courses = yield promise.populate('university program').exec();
    if (!courses || courses.length === 0) {
      return res.status(404).json({
        err: [{ msg: 'CourseNotFound' }],
      });
    }

    const courseInstances = yield CourseInstance
      .find({ course: { $in: courses } })
      .select('course prof semester')
      .populate([{
        path: 'prof',
        select: 'firstname lastname',
      }, {
        path: 'course',
        select: 'name university program',
        populate: [{
          path: 'university',
          select: 'name',
        }, {
          path: 'program',
          select: 'name university degree',
        }],
      }])
      .lean(true)
      .exec()
      .then(function (courseInstances) {
        return res.status(200).json({
          courseInstances,
        });
      }).catch(function (err) {
        logger.error(err);
        return res.status(500).json({
          err: [{ msg: 'InternalError' }],
        });
      });
  });
});

router.get('/:cid/questions', passport.authenticate('jwt', { session: false }), function (req, res) {
  req.checkParams('cid', 'InvalidID').notEmpty().isMongoId();

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      err: errors,
    });
  }

  CourseInstance.findOne({ _id: req.params.cid }).then(function (course) {
    if (!course) {
      return res.status(404).json({
        err: [{ msg: 'CourseNotFound' }],
      });
    }
    return Question.find({ courseInstance: course._id });
  }).then(function (questions) {
    var data = [];
    for (var i = 0; i < questions.length; i++) {
      data.push({
        id: questions[i]._id,
        title: questions[i].title,
        description: questions[i].description,
        user: questions[i].user,
        createDate: questions[i].createDate,
      });
    }
    return res.json({ questions: data });
  }).catch(function (err) {
    logger.error(err);
    return res.status(500).json({
      err: [{ msg: 'InternalError' }],
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
  passport.authenticate('jwt', { session: false }),
  utils.hasPermission('Student'), function (req, res) {
    req.checkParams('cid', 'InvalidID').notEmpty().isMongoId();

    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({
        err: errors,
      });
    }

  // if(req.course.req.user.programs)

    CourseInstance
    .findOne({ _id: req.params.cid })
    .populate('course')
    .then(function (course) {
      if (!course) {
        return res.status(404).json({
          err: [{ msg: 'CourseNotFound' }],
        });
      }


      if (req.user.universities.indexOf(course.course.university) === -1) {
        return res.status(401).json({
          err: [{ msg: 'PermissionDenied' }],
        });
      }

      if (course.participants.indexOf(req.user._id) === -1) {     // proof is the != korrekt?
        course.participants.push(req.user._id);
        course.save();
        return res.json({
          err: [],
        });
      }
    }).catch(function (err) {
      return res.json({
        err: [{ msg: err.message }],
      });
    });
  });

router.get('/:cid/unfollow', passport.authenticate('jwt', { session: false }),
  utils.hasPermission('Student'),
  function (req, res) {
    req.checkParams('cid', 'Invalid course id').notEmpty().isMongoId();

    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({
        err: errors,
      });
    }

    CourseInstance.findOne({ _id: req.params.cid }).then(function (course) {
      if (!course) {
        return res.json({
          err: 'Course not found.',
        });
      }

      if (course.participants.indexOf(req.user._id) !== -1) {      // proof is the == korrekt?
        course.participants.pull(req.user._id);
        course.save();
        return res.json({
          err: [],
        });
      }
    }).catch(function (err) {
      return res.json({
        err: [{ msg: err.message }],
      });
    });
  });

router.get('/:cid/pkgs', passport.authenticate('jwt', { session: false }), function (req, res) {
  req.checkParams('cid', 'Invalid course id').notEmpty().isMongoId();

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      err: errors,
    });
  }

  Pkg
    .find({ courseInstance: req.params.cid })
    .select('name owner courseInstance, createDate')
    .populate([{
      path: 'owner',
      select: 'firstname lastname universities programs',
      populate: [{
        path: 'universities',
        select: 'name',
      }, {
        path: 'programs',
        select: 'name university degree',
      }],
    }])
    .lean(true)
    .exec()
    .then(function (pkgs) {
      if (!pkgs) {
        return res.status(404).json({
          err: [{ msg: 'PkgsNotFound' }],
        });
      }

      return res.status(201).json({
        pkgs,
      });
    }).catch(function (err) {
      logger.error(err.message);
      return res.status(500).json({
        err: [{ msg: 'InternalError' }],
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
 * @apiParam {String} university ID of the university
 * @apiParam {String} [programID] ID of the program, for existing programs
 * @apiParam {String} [programName] Name of the program, for new programs
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *       "err": [],
 *     }
 *
 * @apiError (400) InvalidName Name was not valid
 * @apiError (400) InvalidUniversity University ID was not valid
 * @apiError (400) InvalidProgram Program ID or name was not valid, or none were provided
 * @apiError (404) UniversityNotFound University not found
 * @apiError (404) ProgramNotFound Program not found
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
router.post('/', passport.authenticate('jwt', { session: false }),
  utils.hasPermission('Prof'), function (req, res) {
  // req.checkBody('name', 'InvalidName').notEmpty();
    req.checkBody('university', 'InvalidUniversity').notEmpty().isMongoId();
    req.checkBody('semesterYear', 'InvalidSemesterYear').notEmpty().isInt({ min: 2010, max: 2020 });
    req.checkBody('semesterTerm', 'InvalidSemesterTerm').notEmpty().isIn(['WS', 'SS']);
    if (req.body.description) req.checkBody('description', 'InvalidDescription');
    if (typeof req.body.courseID === 'undefined' &&
      typeof req.body.courseName === 'undefined') {
      return res.status(400).json({
        err: [{ msg: 'InvalidCourse' }],
      });
    }
    if (typeof req.body.courseID !== 'undefined') {
      req.checkBody('courseID', 'InvalidCourse').isMongoId();
    } else if (typeof req.body.courseName !== 'undefined') {
      req.checkBody('courseName', 'InvalidCourse');
    }
    if (typeof req.body.programID === 'undefined' &&
        typeof req.body.programName === 'undefined') {
      return res.status(400).json({
        err: [{ msg: 'InvalidProgram' }],
      });
    }
    if (typeof req.body.programID !== 'undefined') {
      req.checkBody('programID', 'InvalidProgram').isMongoId();
    } else if (typeof req.body.programName !== 'undefined') {
      req.checkBody('programName', 'InvalidProgram');
    }

    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({
        err: errors,
      });
    }

    co(function *() {
      var university = yield University.findOne({ _id: req.body.university });
      var changed = false;
      var program;
      var course;

      if (!university) {
        return res.status(404).json({
          err: [{ msg: 'UniversityNotFound' }],
        });
      }

      if (typeof req.body.programID !== 'undefined') {
        program = yield Program.findOne({ _id: req.body.programID });
      } else if (typeof req.body.programName !== 'undefined') {
        program = new Program({
          name: req.body.programName,
          university: university._id,
        });
        program = yield program.save();
      }
      if (!program) {
        return res.status(404).json({
          err: [{ msg: 'ProgramNotFound' }],
        });
      }

      if (req.user.universities.indexOf(req.body.university) === -1) {
        req.user.universities.push(req.body.university);
        changed = true;
      }
      if (req.user.programs.indexOf(program._id) === -1) {
        req.user.programs.push(program._id);
        changed = true;
      }
      if (changed) req.user.save();

      if (typeof req.body.courseID !== 'undefined') {
        course = yield Course.findOne({ _id: req.body.course });
      } else if (typeof req.body.courseName !== 'undefined') {
        course = new Course({
          name: req.body.courseName,
          university: req.body.university,
          program: program._id,
        });
        course = yield course.save();
      }

      var courseInstance = CourseInstance({
        description: req.body.description,
        course: course,
        prof: req.user,
        semester: {
          semesterYear: req.body.semesterYear,
          semesterTerm: req.body.semesterTerm,
        },
      });
      courseInstance = yield courseInstance.save();

      var pkgsRoot = path.join(path.dirname(__dirname), 'uploads', 'courses', courseInstance.id);
      fs.mkdir(pkgsRoot, 0755, function (err, dir) {
        if (err) {
          logger.error(err);
          return res.status(500).json({
            err: [{ msg: 'InternalError' }],
          });
        }
        courseInstance.pkgsRoot = pkgsRoot;
        courseInstance.save();
        return res.json({
          err: [],
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
