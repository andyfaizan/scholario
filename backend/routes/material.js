const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const async = require('async');
const logger = require('../logger');
const utils = require('../utils');
const User = mongoose.model('User');
const Course = mongoose.model('Course');
const Material = mongoose.model('Material');

var router = express.Router();


router.get('/:mid', passport.authenticate('jwt', {session: false}), function (req, res) {
  req.checkParams('mid', 'Material ID is not valid').isMongoId();

  var errors = req.validationErrors();
  if (errors) {
    return res.json({
      'err': errors
    });
  }

  Material.findOne({ _id: req.params.mid }).then(function (material) {
    if (!material) {
      return res.json({
        'err': [{'msg': 'Material not found'}],
      });
    }
    logger.debug('here');
    fs.readdir(material.root, function (err, files) {
      if (err) {
        return res.json({
          'err': [{'msg': err.message}],
        });
      }
      var paths = [];
      var data = [];
      for (var i = 0; i < files.length; i++) {
        paths.push(path.join(material.root, files[i]));
        data.push({
          'name': files[i],
          'type': '',
          'size': 0,
          'createdBy': {
            id: req.user._id,
            name: req.user.name,
          },
        });
      }
      async.map(paths, fs.stat, function (err, results) {
        if (err) {
          return res.json({
            err: [{'msg': err.message}],
          });
        }
        for (var i = 0; i < files.length; i++) {
          logger.debug(data[i]);
          if (results[i].isFile()) data[i].type = 'file';
          else if (results[i].isDirectory()) data[i].type = 'dir';
          data[i].size = results[i].size;
        }
        return res.json({
          err: [],
          contents: data
        });
      });
    });
  });
});

/**
 * @api {post} /materials Create new material
 * @apiVersion 0.1.0
 * @apiPermission student, prof
 * @apiName PostMaterial
 * @apiGroup Material
 *
 * @apiParam {String} name Name of the package (root dir)
 * @apiParam {String} course ID of the course
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *       "err": [],
 *     }
 *
 * @apiError (404) CourseNotFound Course not found
 * @apiError (400) InvalidName Name was not valid
 * @apiError (400) InvalidCourseID Course ID was not valid
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
            multer({dest: 'uploads/tmp'}).array('material'),
            function (req, res) {
  req.checkBody('name', 'InvalidName').notEmpty().isAlphanumeric();
  req.checkBody('course', 'InvalidCourseID').isMongoId();

  var errors = req.validationErrors();
  if (errors) {
    return res.json({
      'err': errors
    });
  }

  Course.findOne({ _id: req.body.course }).then(function (course) {
    if (!course) {
      return res.json({
        'err': [{'msg': 'CourseNotFound'}],
      });
    }
    var materialRoot = path.join(course.materialsRoot, req.body.name);
    var material = new Material({
      name: req.body.name,
      course: req.body.course,
      owner: req.user._id,
      root: materialRoot,
    }).save().then(function () {
      return fs.mkdir(materialRoot, 0755);
    }).then(function (dir) {
      var movedNum = 0;
      _.each(req.files, function (f) {
        var source = fs.createReadStream(f.path);
        var dest = fs.createWriteStream(path.join(materialRoot, f.originalname));

        source.pipe(dest);
        source.on('end', function() {
          movedNum++;
          fs.unlinkSync(f.path);
          if (movedNum === req.files.length - 1) {
            return res.status(201).json({
              err: [],
            });
          }
        });
        source.on('error', function(err) {
          logger.error(err);
          return res.status(500).json({
            err: [{'msg': 'InternalError'}],
          });
        });
      });
    }).catch(function (err) {
      logger.error(err);
      return res.status(500).json({
        err: [{'msg': 'InternalError'}],
      });
    });
  });
});



module.exports = router;
