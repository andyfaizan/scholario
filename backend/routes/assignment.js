const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const fse = require('fs-extra');
const url = require('url');
const co = require('co');
const _ = require('lodash');
const multer = require('multer');
const logger = require('../logger');
const utils = require('../utils');
const CourseInstance = mongoose.model('CourseInstance');
const Assignment = mongoose.model('Assignment');
const FileAssignment = mongoose.model('FileAssignment');
const InteractiveAssignment = mongoose.model('InteractiveAssignment');
const Solution = mongoose.model('Solution');

var router = express.Router();

router.post('/', passport.authenticate('jwt', { session: false }),
  multer({ dest: 'uploads/tmp' }).array('assignment'),
  utils.hasPermission('Prof'), function (req, res) {
    req.checkBody('name', 'InvalidName').notEmpty();
    req.checkBody('type', 'InvalidType').notEmpty().isIn(['file', 'interactive']);
    req.checkBody('courseInstance', 'InvalidCourseInstance').notEmpty().isMongoId();
    req.checkBody('access', 'InvalidAccess').optional().isIn(['private', 'public']);
    req.checkBody('accessWhitelist', 'InvalidAccessWhitelist').optional();
    req.checkBody('minGrade', 'InvalidMinGrade').optional().isFloat();
    req.checkBody('maxGrade', 'InvalidMaxGrade').optional().isFloat();
    req.checkBody('deadline', 'InvalidDeadline').optional().isDate();

    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({
        err: errors,
      });
    }

    co(function *() {
      let assignment;
      assignment = yield Assignment.findOne({
        courseInstance: req.body.courseInstance,
        name: req.body.name,
        access: req.body.access,
        accessWhitelist: JSON.parse(req.body.accessWhitelist),
      });
      // Assignment exists, only update
      if (assignment) {
        if (req.body.minGrade) assignment.minGrade = req.body.minGrade;
        if (req.body.maxGrade) assignment.maxGrade = req.body.maxGrade;
        if (req.body.deadline) assignment.deadline = new Date(req.body.deadline);

        if (req.files) {
          let movedNum = 0;
          let fileUrls = [];
          const assignmentRoot = path.join(
            path.dirname(__dirname), 'uploads',
            'assignments', assignment.id
          );
          fse.mkdirs(assignmentRoot, function (err) {
            if (err) {
              logger.error(err);
              return res.status(500).json({
                err: [{ msg: 'InternalError' }],
              });
            }

            _.each(req.files, f => {
              const filePath = path.join(assignmentRoot, f.originalname);
              const source = fse.createReadStream(f.path);
              const dest = fse.createWriteStream(filePath);

              source.pipe(dest);
              source.on('end', () => {
                movedNum++;
                fse.unlinkSync(f.path);
                if (assignment.filePaths.indexOf(filePath) === -1) assignment.filePaths.push(filePath);
                if (movedNum === req.files.length) {
                  assignment.modifyDate = Date.now();
                  assignment.save();
                  for (let i = 0; i < assignment.filePaths.length; i++) {
                    const fileUrl = url.format({
                      protocol: 'http',
                      slashes: true,
                      host: 'uploads.scholario.de',
                      pathname: `/assignments/${assignment._id}/${path.basename(assignment.filePaths[i])}`,
                    });
                    fileUrls.push(fileUrl);
                  }

                  return res.status(200).json({
                    _id: assignment._id,
                    name: assignment.name,
                    courseInstance: req.body.courseInstance,
                    type: assignment.type,
                    createDate: assignment.createDate,
                    fileUrls: fileUrls,
                    access: assignment.access,
                    accessWhitelist: assignment.accessWhitelist,
                    minGrade: assignment.minGrade,
                    maxGrade: assignment.maxGrade,
                    deadline: assignment.deadline,
                  });
                }
              });
              source.on('error', err => {
                logger.error(err);
                return res.status(500).json({
                  err: [{ msg: 'InternalError' }],
                });
              });
            });
          });
        } else {
          assignment.modifyDate = Date.now();
          assignment.save();

          const fileUrls = [];
          for (let i = 0; i < assignment.filePaths.length; i++) {
            const fileUrl = url.format({
              protocol: 'http',
              slashes: true,
              host: 'uploads.scholario.de',
              pathname: `/assignments/${assignment._id}/${path.basename(assignment.filePaths[i])}`,
            });
            fileUrls.push(fileUrl);
          }

          return res.status(200).json({
            _id: assignment._id,
            name: assignment.name,
            courseInstance: req.body.courseInstance,
            type: assignment.type,
            createDate: assignment.createDate,
            fileUrls: fileUrls,
            access: assignment.access,
            accessWhitelist: assignment.accessWhitelist,
            minGrade: assignment.minGrade,
            maxGrade: assignment.maxGrade,
            deadline: assignment.deadline,
          });
        }
      } else {
        const ci = yield CourseInstance.findOne({ _id: req.body.courseInstance });
        if (!ci) {
          return res.status(404).json({
            err: [{ msg: 'CourseInstanceNotFound' }],
          });
        }
        if (req.body.type === 'file') {
          if (!req.files || req.files.length === 0) {
            return res.status(404).json({
              err: [{ msg: 'FileMissing' }],
            });
          }

          assignment = new FileAssignment({
            name: req.body.name,
            courseInstance: req.body.courseInstance,
          });
          if (req.body.access) {
            if (req.body.access === 'public') assignment.access = req.body.access;
            else if (req.body.access === 'private') {
              if (!req.body.accessWhitelist) {
                return res.status(400).json({
                  err: [{ msg: 'InvalidAccess' }],
                });
              }

              assignment.access = req.body.access;
              assignment.accessWhitelist = JSON.parse(req.body.accessWhitelist);
            }
          }
          if (req.body.minGrade) assignment.minGrade = req.body.minGrade;
          if (req.body.maxGrade) assignment.maxGrade = req.body.maxGrade;
          if (req.body.deadline) assignment.deadline = new Date(req.body.deadline);
          assignment = yield assignment.save();

          let movedNum = 0;
          let fileUrls = [];
          const assignmentRoot = path.join(
            path.dirname(__dirname), 'uploads',
            'assignments', assignment.id
          );
          fse.mkdirs(assignmentRoot, function (err) {
            if (err) {
              logger.error(err);
              return res.status(500).json({
                err: [{ msg: 'InternalError' }],
              });
            }

            _.each(req.files, f => {
              const filePath = path.join(assignmentRoot, f.originalname);
              const source = fse.createReadStream(f.path);
              const dest = fse.createWriteStream(filePath);

              source.pipe(dest);
              source.on('end', () => {
                movedNum++;
                fse.unlinkSync(f.path);
                assignment.filePaths.push(filePath);
                const fileUrl = url.format({
                  protocol: 'http',
                  slashes: true,
                  host: 'uploads.scholario.de',
                  pathname: `/assignments/${assignment._id}/${f.originalname}`,
                });
                fileUrls.push(fileUrl);

                if (movedNum === req.files.length) {
                  assignment.save();
                  return res.status(201).json({
                    _id: assignment._id,
                    name: assignment.name,
                    courseInstance: req.body.courseInstance,
                    type: assignment.type,
                    createDate: assignment.createDate,
                    fileUrls: fileUrls,
                    access: assignment.access,
                    accessWhitelist: assignment.accessWhitelist,
                    minGrade: assignment.minGrade,
                    maxGrade: assignment.maxGrade,
                    deadline: assignment.deadline,
                  });
                }
              });
              source.on('error', err => {
                logger.error(err);
                return res.status(500).json({
                  err: [{ msg: 'InternalError' }],
                });
              });
            });
          });
        } else if (req.body.type === 'interactive') {
          assignment = InteractiveAssignment({
            name: req.body.name,
            courseInstance: req.body.courseInstance,
          });
          if (req.body.access) {
            if (req.body.access === 'public') assignment.access = req.body.access;
            else if (req.body.access === 'private') {
              if (!req.body.accessWhitelist) {
                return res.status(400).json({
                  err: [{ msg: 'InvalidAccess' }],
                });
              }

              assignment.access = req.body.access;
              assignment.accessWhitelist = JSON.parse(req.body.accessWhitelist);
            }
          }
          if (req.body.minGrade) assignment.minGrade = req.body.minGrade;
          if (req.body.maxGrade) assignment.maxGrade = req.body.maxGrade;
          if (req.body.deadline) assignment.deadline = new Date(req.body.deadline);

          assignment = yield assignment.save();

          return res.status(201).json({
            _id: assignment._id,
            name: assignment.name,
            courseInstance: assignment.courseInstance,
            type: assignment.type,
            createDate: assignment.createDate,
            access: assignment.access,
            accessWhitelist: assignment.accessWhitelist,
            minGrade: assignment.minGrade,
            maxGrade: assignment.maxGrade,
            deadline: assignment.deadline,
          });
        }
      }
    }).catch(function (err) {
      logger.error(err);
      return res.status(500).json({
        err: [{
          msg: 'InternalError',
        }],
      });
    });
  });

router.get('/:aid', passport.authenticate('jwt', { session: false }), function (req, res) {
  req.checkParams('aid', 'InvalidId').notEmpty().isMongoId();

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      err: errors,
    });
  }

  co(function *() {
    let assignment = yield Assignment.findOne({ _id: req.params.aid })
      .select(
        'name courseInstance createDate modifyDate access accessWhitelist filePaths minGrade maxGrade deadline'
      )
      .lean(true)
      .exec();
    if (!assignment) {
      return res.status(404).json({
        err: [{ msg: 'AssignmentNotFound' }],
      });
    }

    assignment.fileUrls = [];
    for (let i = 0; i < assignment.filePaths.length; i++) {
      assignment.fileUrls[i] = url.format({
        protocol: 'http',
        slashes: true,
        host: 'uploads.scholario.de',
        pathname: `/assignments/${assignment._id}/${path.basename(assignment.filePaths[i])}`,
      });
    }
    assignment = _.omit(assignment, 'filePaths');

    let solutions = yield Solution.find({ assignment: assignment._id })
      .select('_id assignment user createDate modifyDate grade comment filePath')
      .lean(true)
      .exec();

    for (let i = 0; i < solutions.length; i++) {
      solutions[i].fileUrl = url.format({
        protocol: 'http',
        slashes: true,
        host: 'uploads.scholario.de',
        pathname: `/solutions/${solutions[i]._id}/${path.basename(solutions[i].filePath)}`,
      });
      solutions[i] = _.omit(solutions[i], 'filePath');
    }

    assignment.solutions = solutions;

    return res.status(200).json(assignment);
  }).catch(function (err) {
    logger.error(err);
    return res.status(500).json({
      err: [{
        msg: 'InternalError',
      }],
    });
  });
});

router.get('/', passport.authenticate('jwt', { session: false }), function (req, res) {
  req.checkQuery('cid', 'InvalidId').notEmpty().isMongoId();
  req.checkQuery('name', 'InvalidName').notEmpty();
  req.checkQuery('user', 'InvalidUser').optional().isMongoId(); // The assignment for a particular user, accessWhitelist

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      err: errors,
    });
  }

  co(function *() {
    let assignment;
    if (req.query.user) {
      assignment = yield Assignment.findOne({
        courseInstance: req.query.cid,
        name: req.query.name,
        accessWhitelist: [req.query.user],
      })
        .select(
          'name courseInstance createDate modifyDate access accessWhitelist filePaths minGrade maxGrade deadline'
        )
        .lean(true)
        .exec();
    } else {
      assignment = yield Assignment.findOne({ courseInstance: req.query.cid, name: req.query.name })
        .select(
          'name courseInstance createDate modifyDate access accessWhitelist filePaths minGrade maxGrade deadline'
        )
        .lean(true)
        .exec();
    }
    if (!assignment) {
      return res.status(404).json({
        err: [{ msg: 'AssignmentNotFound' }],
      });
    }

    assignment.fileUrls = [];
    for (let i = 0; i < assignment.filePaths.length; i++) {
      assignment.fileUrls[i] = url.format({
        protocol: 'http',
        slashes: true,
        host: 'uploads.scholario.de',
        pathname: `/assignments/${assignment._id}/${encodeURIComponent(path.basename(assignment.filePaths[i]))}`,
      });
    }
    assignment = _.omit(assignment, 'filePaths');

    let solutions = yield Solution.find({ assignment: assignment._id })
      .select('_id assignment user createDate modifyDate grade comment filePath')
      .lean(true)
      .exec();

    for (let i = 0; i < solutions.length; i++) {
      solutions[i].fileUrl = url.format({
        protocol: 'http',
        slashes: true,
        host: 'uploads.scholario.de',
        pathname: `/solutions/${solutions[i]._id}/${encodeURIComponent(path.basename(solutions[i].filePath))}`,
      });
      solutions[i] = _.omit(solutions[i], 'filePath');
    }

    assignment.solutions = solutions;

    return res.status(200).json(assignment);
  }).catch(function (err) {
    logger.error(err);
    return res.status(500).json({
      err: [{
        msg: 'InternalError',
      }],
    });
  });
});

module.exports = router;
