const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const co = require('co');
const async = require('async');
const url = require('url');
const logger = require('../logger');
const utils = require('../utils');
const User = mongoose.model('User');
const CourseInstance = mongoose.model('CourseInstance');
const Material = mongoose.model('Material');
const Pkg = mongoose.model('Pkg');

var router = express.Router();


router.get('/:pid', passport.authenticate('jwt', {session: false}), function (req, res) {
  req.checkParams('pid', 'IDNotValid').notEmpty().isMongoId();

  var errors = req.validationErrors();
  if (errors) {
    return res.json({
      err: errors
    });
  }

  co(function *() {
    var pkg = yield Pkg
      .findOne({ _id: req.params.pid })
      .select('name owner courseInstance createDate')
      .populate([{
        path: 'owner',
        select: 'firstname lastname role universities programs',
        populate: [{
          path: 'universities',
          select: 'name',
        }, {
          path: 'programs',
          select: 'name university',
        }]
      }])
      .lean(true)
      .exec();

    if (!pkg) {
      return res.status(404).json({
        err: [{ msg: 'PkgNotFound' }],
      });
    }

    var materials = yield Material
      .find({ pkg: req.params.pid })
      .select('name ext size pkg createDate')
      .lean(true)
      .exec();

    for (var i = 0; i < materials.length; i++) {
      materials[i].url = url.format({
        protocol: 'http',
        slashes: true,
        host: 'uploads.scholario.de',
        pathname: `/courses/${pkg.courseInstance}/${pkg._id}/${encodeURIComponent(materials[i].name)}${materials[i].ext}`,
      });
    }

    pkg.materials = materials
    return res.json(pkg);
  });
/*  Pkg.findOne({ _id: req.params.pid }).then(function (pkg) {*/
    //if (!pkg) {
      //return res.json({
        //err: [{ 'msg': 'Material not found' }],
      //});
    //}
    //fs.readdir(pkg.root, function (err, files) {
      //if (err) {
        //return res.json({
          //'err': [{'msg': err.message}],
        //});
      //}
      //var paths = [];
      //var data = [];
      //for (var i = 0; i < files.length; i++) {
        //paths.push(path.join(material.root, files[i]));
        //data.push({
          //'name': files[i],
          //'type': '',
          //'size': 0,
          //'createdBy': {
            //id: req.user._id,
            //name: req.user.name,
          //},
        //});
      //}
      //async.map(paths, fs.stat, function (err, results) {
        //if (err) {
          //return res.json({
            //err: [{'msg': err.message}],
          //});
        //}
        //for (var i = 0; i < files.length; i++) {
          //if (results[i].isFile()) data[i].type = 'file';
          //else if (results[i].isDirectory()) data[i].type = 'dir';
          //data[i].size = results[i].size;
        //}
        //return res.json({
          //err: [],
          //contents: data
        //});
      //});
    //});
  /*});*/
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
  req.checkQuery('name', 'InvalidName').notEmpty().isAlphanumeric();
  req.checkQuery('courseInstance', 'InvalidCourseID').isMongoId();

  var errors = req.validationErrors();
  if (errors) {
    return res.json({
      'err': errors
    });
  }

  co(function *() {
    var courseInstance = yield CourseInstance.findOne({ _id: req.query.courseInstance })
    if (!courseInstance) {
      return res.status(404).json({
        err: [{ msg: 'CourseInstanceNotFound' }],
      });
    }

    var pkg = yield new Pkg({
      name: req.query.name,
      courseInstance: req.query.courseInstance,
      owner: req.user._id,
      //root: materialRoot,
    }).save()
    var pkgRoot = path.join(courseInstance.pkgsRoot, pkg.id.toString());

    fs.mkdirSync(pkgRoot, 0755);

    var movedNum = 0;
    _.each(req.files, f => {
      var parsed = path.parse(f.originalname);
      var material = new Material({
        name: parsed.name,
        ext: parsed.ext,
        size: f.size,
        pkg: pkg._id,
      }).save();
      var source = fs.createReadStream(f.path);
      var dest = fs.createWriteStream(path.join(pkgRoot, f.originalname));

      source.pipe(dest);
      source.on('end', () => {
        movedNum++;
        fs.unlinkSync(f.path);
        if (movedNum === req.files.length - 1) {
          return res.status(201).json({
            err: [],
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
  }).catch(function (err) {
    logger.error(err);
    return res.status(500).json({
      err: [{ msg: 'InternalError' }],
    });
  });
});


module.exports = router;