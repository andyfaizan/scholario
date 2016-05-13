const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const co = require('co');
const logger = require('../logger');
const utils = require('../utils');
const User = mongoose.model('User');
const Course = mongoose.model('Course');
const CourseInstance = mongoose.model('CourseInstance');
const Question = mongoose.model('Question');
const Material = mongoose.model('Material');
const University = mongoose.model('University');
const Program = mongoose.model('Program');

var router = express.Router();



router.get('/:cid', passport.authenticate('jwt', {session: false}), function (req, res) {
  req.checkParams('cid', 'InvalidId').notEmpty().isMongoId();

  var errors = req.validationErrors();
  if (errors) {
    return res.json({
      'err': errors
    });
  }

  co(function *() {
    var course = yield CourseInstance.findOne({ _id: req.params.cid })
      .select('prof semester course')
      .populate([{
        path: 'course',
        select: 'name university program',
        populate: [{
          path: 'university',
          select: 'name',
        }, {
          path: 'program',
          select: 'name university',
        }],
      }, {
        path: 'prof',
        select: 'firstname lastname role universities programs'
      }])
      .lean(true)
      .exec()

    if (!course) {
      return res.status(404).json({
        err: [{
          msg: 'CourseNotFound.',
        }]
      });
    }

    var questions = yield Question
      .find({ courseInstance: course._id })
      .select('title description courseInstance user createDate')
      .populate([{
        path: 'user',
        select: 'firstname lastname universities programs',
      }])
      .limit(5)
      .lean(true)
      .exec()

    var materials = yield Material
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
          select: 'name university',
        }]
      }])
      .limit(5)
      .lean(true)
      .exec()

    course.questions = questions
    course.materials = materials
    return res.status(200).json(course);
  }).catch(function (err) {
    logger.error(err)
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
router.get('/', passport.authenticate('jwt', {session: false}), function (req, res) {
  if (req.query.q) {
    req.checkQuery('q', 'InvalidQuery').notEmpty().isAscii();
  }

  if (req.query.program) {
    req.checkQuery('program', 'InvalidProgram').notEmpty().isMongoId();
  }

  var errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      err: errors
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

    var courses = yield promise.populate('university program').exec();
    if (!courses || courses.length === 0) {
      return res.status(404).json({
        err: [{ msg: 'CourseNotFound' }],
      });
    }

    var courseInstances = yield CourseInstance
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
         select: 'name university',
       }]
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

router.get('/:cid/questions', passport.authenticate('jwt', {session: false}), function (req, res) {
  req.checkParams('cid', 'InvalidID').notEmpty().isMongoId();

  var errors = req.validationErrors();
  if (errors) {
    return res.json({
      'err': errors
    });
  }

  CourseInstance.findOne({ _id: req.params.cid }).then(function (course) {
    if (!course) {
      return res.status(404).json({
        err: [{msg: 'CourseNotFound'}],
      });
    }
    return Question.find({ courseInstance: course._id });
  }).then(function (questions) {
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
  }).catch(function (err) {
    logger.error(err);
    return res.status(500).json({
      err: [{msg: 'InternalError'}],
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

  CourseInstance.findOne({ _id: req.params.cid }).then(function (course) {
    if (!course) {
      return res.status(404).json({
        err: [{msg: 'CourseNotFound'}],
      });
    }

    if (course.participants.indexOf(req.user._id) === -1)      // proof is the != korrekt?
      course.participants.push(req.user._id);
      course.save();
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

  CourseInstance.findOne({ _id: req.params.cid }).then(function (course) {
    if (!course) {
      return res.json({
        err: 'Course not found.',
      });
    }

    if (course.participants.indexOf(req.user._id) != -1)      // proof is the == korrekt?
      course.participants.pull(req.user._id);
      course.save();
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

  Material.find({ courseInstance: req.params.cid }).populate('owner').then(function (materials) {
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
router.post('/', passport.authenticate('jwt', {session: false}),
            utils.hasPermission('Prof'), function (req, res) {
  //req.checkBody('name', 'InvalidName').notEmpty().isAscii();
  req.checkBody('university', 'InvalidUniversity').notEmpty().isMongoId();
  req.checkBody('semesterYear', 'InvalidSemesterYear').notEmpty().isInt({ min: 2010, max: 2020 });
  req.checkBody('semesterTerm', 'InvalidSemesterTerm').notEmpty().isIn(['WS', 'SS']);
  if (typeof req.body.courseID === 'undefined' &&
      typeof req.body.courseName === 'undefined') {
    return res.status(400).json({
      err: [{ msg: 'InvalidCourse' }],
    });
  }
  if (typeof req.body.courseID != 'undefined') {
    req.checkBody('courseID', 'InvalidCourse').isMongoId();
  } else if (typeof req.body.courseName != 'undefined') {
    req.checkBody('courseName', 'InvalidCourse').isAscii();
  }
  if (typeof req.body.programID === 'undefined' &&
      typeof req.body.programName === 'undefined') {
    return res.status(400).json({
      err: [{ msg: 'InvalidProgram' }],
    });
  }
  if (typeof req.body.programID != 'undefined') {
    req.checkBody('programID', 'InvalidProgram').isMongoId();
  } else if (typeof req.body.programName != 'undefined') {
    req.checkBody('programName', 'InvalidProgram').isAscii();
  }

  var errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      'err': errors
    });
  }

  co(function *() {
    var university = yield University.findOne({ _id: req.body.university });
    if (!university) {
      return res.status(404).json({
        err: [{ msg: 'UniversityNotFound' }],
      });
    }

    var program;
    if (typeof req.body.programID != 'undefined') {
      program = yield Program.findOne({ _id: req.body.programID });
    } else if (typeof req.body.programName != 'undefined') {
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

    var changed = false;
    if (req.user.universities.indexOf(req.body.university) === -1) {
      req.user.universities.push(req.body.university);
      changed = true;
    }
    if (req.user.programs.indexOf(program._id) === -1) {
      req.user.programs.push(program._id);
      changed = true;
    }
    if (changed) req.user.save();

    var course;
    if (typeof req.body.courseID !== 'undefined') {
      course = yield Course.findOne({ _id: req.body.course });
    } else if (typeof req.body.courseName !== 'undefined') {
      var course = new Course({
        name: req.body.courseName,
        university: req.body.university,
        program: program._id,
      });
      course = yield course.save();
    }

    var courseInstance = CourseInstance({
      course: course,
      prof: req.user,
      semester: {
        semesterYear: req.body.semesterYear,
        semesterTerm: req.body.semesterTerm,
      },
    });
    courseInstance = yield courseInstance.save();

    var materialsRoot = path.join(path.dirname(__dirname), 'uploads', 'courses', courseInstance.id);
    fs.mkdir(materialsRoot, 0755, function (err, dir) {
      if (err) {
        logger.error(err.message);
        return res.status(500).json({
          err: [{msg: 'InternalError'}],
        });
      }
      courseInstance.materialsRoot = materialsRoot;
      courseInstance.save();
      return res.json({
        err: [],
      });
    });

  }).catch(function (err) {
    logger.error(err);
    return res.status(500).json({
      err: [{msg: 'InternalError'}],
    });
  });
});


module.exports = router;
