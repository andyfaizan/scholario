const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const fse = require('fs-extra');
const url = require('url');
const co = require('co');
const multer = require('multer');
const logger = require('../logger');
const Assignment = mongoose.model('Assignment');
const Solution = mongoose.model('Solution');
const FileSolution = mongoose.model('FileSolution');

var router = express.Router();

router.post('/', passport.authenticate('jwt', { session: false }),
  multer({ dest: 'uploads/tmp' }).single('solution'),
  function (req, res) {
    req.checkBody('assignment', 'InvalidAssignment').notEmpty().isMongoId();
    req.checkBody('type', 'InvalidType').notEmpty().isIn(['file', 'interactive']);
    req.checkBody('grade', 'InvalidGrade').optional().isFloat();

    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({
        err: errors,
      });
    }

    co(function *() {
      const assignment = yield Assignment.findOne({ _id: req.body.assignment });
      if (!assignment) {
        return res.status(404).json({
          err: [{ msg: 'AssignmentNotFound' }],
        });
      }
      if (assignment.access === 'private') {
        if (assignment.accessWhitelist.indexOf(req.user._id) === -1) {
          return res.status(401).json({
            err: [{ msg: 'PermissionDenied' }],
          });
        }
      }
      const solutionsByUser = yield Solution.find({ user: req.user, assignment: assignment });
      if (solutionsByUser.length > 0) {
        return res.status(400).json({
          err: [{ msg: 'SolutionExists' }],
        });
      }
      if (req.body.type === 'file') {
        if (!req.file) {
          return res.status(404).json({
            err: [{ msg: 'FileMissing' }],
          });
        }

        let solution = new FileSolution({
          user: req.user,
          assignment: req.body.assignment,
        });
        solution = yield solution.save();

        const solutionRoot = path.join(
          path.dirname(__dirname), 'uploads',
          'solutions', solution.id
        );
        fse.mkdirs(solutionRoot, function (err) {
          if (err) {
            logger.error(err);
            return res.status(500).json({
              err: [{ msg: 'InternalError' }],
            });
          }

          const filePath = path.join(solutionRoot, req.file.originalname);
          const source = fse.createReadStream(req.file.path);
          const dest = fse.createWriteStream(filePath);

          source.pipe(dest);
          source.on('end', () => {
            fse.unlinkSync(req.file.path);
            solution.filePath = filePath;
            solution.save();
            const fileUrl = url.format({
              protocol: 'http',
              slashes: true,
              host: 'uploads.scholario.de',
              pathname: `/solutions/${solution._id}/${req.file.originalname}`,
            });

            return res.status(201).json({
              _id: solution._id,
              user: req.user._id,
              assignment: solution.assignment,
              type: solution.type,
              createDate: assignment.createDate,
              fileUrl: fileUrl,
            });
          });
          source.on('error', err => {
            logger.error(err);
            return res.status(500).json({
              err: [{ msg: 'InternalError' }],
            });
          });
        });
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

router.put('/:sid', passport.authenticate('jwt', { session: false }), function (req, res) {
  req.checkParams('sid', 'InvalidId').notEmpty().isMongoId();

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      err: errors,
    });
  }

  co(function *() {
    const solution = yield Solution.findOne({ _id: req.params.sid })
      .populate([{
        path: 'assignment',
        select: 'courseInstance',
        populate: [{
          path: 'courseInstance',
        }],
      }]);
    if (!solution) {
      return res.status(404).json({
        err: [{ msg: 'SolutionNotFound' }],
      });
    }

    if (req.body.grade) {
      if (req.user.id !== solution.assignment.courseInstance.prof.toString()) {
        return res.status(400).json({
          err: [{ msg: 'PermissionDenied' }],
        });
      }
      if (req.body.grade < solution.assignment.minGrade || req.body.grade > solution.assignment.maxGrade) {
        return res.status(400).json({
          err: [{ msg: 'InvalidGradeRange' }],
        });
      }

      solution.grade = req.body.grade;
      solution.comment = req.body.comment;
      solution.save();

      return res.status(200).json({
        _id: solution._id,
        grade: solution.grade,
        comment: solution.comment,
      });
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

router.put('/', passport.authenticate('jwt', { session: false }), function (req, res) {
  req.checkBody('courseInstance', 'InvalidCourseInstance').notEmpty().isMongoId();
  req.checkBody('assignmentName', 'InvalidAssignmentName').notEmpty();
  req.checkBody('user', 'InvalidUser').notEmpty().isMongoId();

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      err: errors,
    });
  }

  co(function *() {
    const assignment = yield Assignment.findOne({
      courseInstance: req.body.courseInstance,
      name: req.body.assignmentName,
    });
    const solution = yield Solution.findOne({ assignment: assignment._id, user: req.body.user })
      .populate([{
        path: 'assignment',
        select: 'courseInstance',
        populate: [{
          path: 'courseInstance',
        }],
      }]);
    if (!solution) {
      return res.status(404).json({
        err: [{ msg: 'SolutionNotFound' }],
      });
    }

    if (req.body.grade) {
      if (req.user.id !== solution.assignment.courseInstance.prof.toString()) {
        return res.status(400).json({
          err: [{ msg: 'PermissionDenied' }],
        });
      }
      if (req.body.grade < solution.assignment.minGrade || req.body.grade > solution.assignment.maxGrade) {
        return res.status(400).json({
          err: [{ msg: 'InvalidGradeRange' }],
        });
      }

      solution.grade = req.body.grade;
      solution.comment = req.body.comment;
      solution.save();

      return res.status(200).json({
        _id: solution._id,
        grade: solution.grade,
        comment: solution.comment,
      });
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


module.exports = router;
