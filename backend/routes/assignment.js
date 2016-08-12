const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const fse = require('fs-extra');
const url = require('url');
const co = require('co');
const multer = require('multer');
const logger = require('../logger');
const utils = require('../utils');
const CourseInstance = mongoose.model('CourseInstance');
// const Assignment = mongoose.model('Assignment');
const FileAssignment = mongoose.model('FileAssignment');
const InteractiveAssignment = mongoose.model('InteractiveAssignment');

var router = express.Router();

router.post('/', passport.authenticate('jwt', { session: false }),
  multer({ dest: 'uploads/tmp' }).single('assignment'),
  utils.hasPermission('Prof'), function (req, res) {
    req.checkBody('name', 'InvalidName').notEmpty();
    req.checkBody('type', 'InvalidType').notEmpty().isIn(['file', 'interactive']);
    req.checkBody('courseInstance', 'InvalidCourseInstance').notEmpty().isMongoId();
    req.checkBody('access', 'InvalidAccess').optional().isIn(['private', 'public']);
    req.checkBody('accessWhitelist', 'InvalidAccessWhitelist').optional();

    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({
        err: errors,
      });
    }

    co(function *() {
      const ci = yield CourseInstance.findOne({ _id: req.body.courseInstance });
      if (!ci) {
        return res.status(404).json({
          err: [{ msg: 'CourseInstanceNotFound' }],
        });
      }
      if (req.body.type === 'file') {
        if (!req.file) {
          return res.status(404).json({
            err: [{ msg: 'FileMissing' }],
          });
        }

        let assignment = new FileAssignment({
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
            assignment.accessWhitelist = JSON.parse(req.body.accessWhitelist); // Form data is not parsed automatically
          }
        }
        assignment = yield assignment.save();

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

          const filePath = path.join(assignmentRoot, req.file.originalname);
          const source = fse.createReadStream(req.file.path);
          const dest = fse.createWriteStream(filePath);

          source.pipe(dest);
          source.on('end', () => {
            fse.unlinkSync(req.file.path);
            assignment.filePath = filePath;
            assignment.save();
            const fileUrl = url.format({
              protocol: 'http',
              slashes: true,
              host: 'uploads.scholario.de',
              pathname: `/assignments/${assignment._id}/${req.file.originalname}`,
            });

            return res.status(201).json({
              _id: assignment._id,
              name: assignment.name,
              courseInstance: req.body.courseInstance,
              type: assignment.type,
              createDate: assignment.createDate,
              fileUrl: fileUrl,
              access: assignment.access,
              accessWhitelist: assignment.accessWhitelist,
            });
          });
          source.on('error', err => {
            logger.error(err);
            return res.status(500).json({
              err: [{ msg: 'InternalError' }],
            });
          });
        });
      } else if (req.body.type === 'interactive') {
        let assignment = InteractiveAssignment({
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
            assignment.accessWhitelist = JSON.parse(req.body.accessWhitelist); // Form data is not parsed automatically
          }
        }

        assignment = yield assignment.save();

        return res.status(201).json({
          _id: assignment._id,
          name: assignment.name,
          courseInstance: assignment.courseInstance,
          type: assignment.type,
          createDate: assignment.createDate,
          access: assignment.access,
          accessWhitelist: assignment.accessWhitelist,
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
