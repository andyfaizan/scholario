var Promise = require('bluebird');
const fs = require('fs');
const path = require('path');
const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const co = require('co');
const url = require('url');
const logger = require('../logger');
const CourseInstance = mongoose.model('CourseInstance');
const Material = mongoose.model('Material');
const Bookmark = mongoose.model('Bookmark');
const Pkg = mongoose.model('Pkg');

const rimrafAsync = Promise.promisify(require('rimraf'));

var router = express.Router();


router.get('/:pid', passport.authenticate('jwt', { session: false }), function (req, res) {
  req.checkParams('pid', 'IDNotValid').notEmpty().isMongoId();

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      err: errors,
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
          select: 'name university degree',
        }],
      }])
      .lean(true)
      .exec();

    if (!pkg) {
      return res.status(404).json({
        err: [{ msg: 'PkgNotFound' }],
      });
    }

    const materials = yield Material
      .find({ pkg: req.params.pid })
      .select('name ext mimetype size pkg createDate')
      .lean(true)
      .exec();

    for (let i = 0; i < materials.length; i++) {
      materials[i].url = url.format({
        protocol: 'http',
        slashes: true,
        host: 'uploads.scholario.de',
        pathname:
        `/courses/${pkg.courseInstance}/${pkg._id}/${encodeURIComponent(materials[i].name)}${materials[i].ext}`,
      });
    }

    const bookmarks = yield Bookmark
      .find({ pkg: req.params.pid })
      .select('title url createDate pkg')
      .lean(true)
      .exec();

    pkg.materials = materials;
    pkg.bookmarks = bookmarks;
    return res.json(pkg);
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
router.post('/', passport.authenticate('jwt', { session: false }),
  multer({ dest: 'uploads/tmp' }).array('material'),
  function (req, res) {
    var access = 'public';
    var materials = [];
    var movedNum = 0;

    req.checkQuery('name', 'InvalidName').notEmpty();
    req.checkQuery('courseInstance', 'InvalidCourseID').isMongoId();
    if (req.query.access) req.checkQuery('access', 'InvalidAccess').notEmpty();

    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({
        err: errors,
      });
    }

    co(function *() {
      var courseInstance = yield CourseInstance.findOne({ _id: req.query.courseInstance });
      if (!courseInstance) {
        return res.status(404).json({
          err: [{ msg: 'CourseInstanceNotFound' }],
        });
      }

      if (req.query.access) access = req.query.access;
      const pkg = yield new Pkg({
        name: req.query.name,
        courseInstance: req.query.courseInstance,
        owner: req.user._id,
        access,
        //root: materialRoot,
      }).save();
      const pkgRoot = path.join(courseInstance.pkgsRoot, pkg.id.toString());

      fs.mkdirSync(pkgRoot, parseInt('0755', 8));

      if (!req.files || req.files.length === 0) {
        return res.status(201).json({
          _id: pkg._id,
          name: pkg.name,
          courseInstance: pkg.courseInstance,
          owner: pkg.owner,
          access: pkg.access,
          createDate: pkg.createDate,
          materials: [],
        });
      }

      _.each(req.files, f => {
        var parsed = path.parse(f.originalname);
        const material = new Material({
          name: parsed.name,
          ext: parsed.ext,
          mimetype: parsed.mimetype,
          size: f.size,
          pkg: pkg._id,
        });
        material.save(() => {
          materials.push(material);
          const source = fs.createReadStream(f.path);
          const dest = fs.createWriteStream(path.join(pkgRoot, f.originalname));

          source.pipe(dest);
          source.on('end', () => {
            movedNum++;
            fs.unlinkSync(f.path);
            if (movedNum === req.files.length) {
              return res.status(201).json({
                _id: pkg._id,
                name: pkg.name,
                courseInstance: pkg.courseInstance,
                owner: pkg.owner,
                access: pkg.access,
                createDate: pkg.createDate,
                materials,
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
    }).catch(function (err) {
      logger.error(err);
      return res.status(500).json({
        err: [{ msg: 'InternalError' }],
      });
    });
  });

router.delete('/:pid', passport.authenticate('jwt', { session: false }), function (req, res) {
  req.checkParams('pid', 'InvalidPkgId').notEmpty().isMongoId();

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      err: errors,
    });
  }

  co(function *() {
    var pkg = yield Pkg.findOne({ _id: req.params.pid }).populate('courseInstance');
    if (!pkg) {
      return res.status(404).json({
        err: [{ msg: 'PkgNotFound' }],
      });
    }
    if (pkg.owner.toString() !== req.user.id.toString()) {
      return res.status(401).json({
        err: [{ msg: 'PermissionDenied' }],
      });
    }

    const pkgRoot = path.join(pkg.courseInstance.pkgsRoot, pkg.id.toString());
    yield rimrafAsync(pkgRoot, { disableGlob: true });
    yield pkg.remove();
    return res.status(200).json({});
  }).catch(function (err) {
    logger.error(err);
    return res.status(500).json({
      err: [{ msg: 'InternalError' }],
    });
  });
});


router.post('/:pid/materials', passport.authenticate('jwt', { session: false }),
  multer({ dest: 'uploads/tmp' }).array('material'),
  function (req, res) {
    var movedNum = 0;
    var materials = [];

    req.checkParams('pid', 'InvalidPackageId').notEmpty().isMongoId();

    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({
        err: errors,
      });
    }

    co(function *() {
      var pkg = yield Pkg.findOne({ _id: req.params.pid }).populate('courseInstance').exec();
      if (pkg.owner.toString() !== req.user.id.toString()) {
        return res.status(401).json({
          err: [{ msg: 'PermissionDenied' }],
        });
      }

      const pkgRoot = path.join(pkg.courseInstance.pkgsRoot, pkg.id.toString());

      if (!req.files || req.files.length === 0) {
        return res.status(201).json({});
      }

      _.each(req.files, f => {
        var parsed = path.parse(f.originalname);
        const material = new Material({
          name: parsed.name,
          ext: parsed.ext,
          mimetype: f.mimetype,
          size: f.size,
          pkg: req.params.pid,
        });
        material.save(() => {
          materials.push(material);
          const source = fs.createReadStream(f.path);
          const dest = fs.createWriteStream(path.join(pkgRoot, f.originalname));

          source.pipe(dest);
          source.on('end', () => {
            movedNum++;
            fs.unlinkSync(f.path);
            if (movedNum === req.files.length) {
              res.status(201).json({
                materials,
              });

              // Update stats
              req.user.updateStats('materialsUploaded', pkg.courseInstance._id);
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
    }).catch(function (err) {
      logger.error(err);
      return res.status(500).json({
        err: [{ msg: 'InternalError' }],
      });
    });
  });

router.post('/:pid/bookmarks', passport.authenticate('jwt', { session: false }), function (req, res) {
  req.checkParams('pid', 'InvalidPackageId').notEmpty().isMongoId();
  req.checkBody('title', 'InvalidTitle').notEmpty();
  req.checkBody('url', 'InvalidUrl').notEmpty().isURL();

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      err: errors,
    });
  }

  co(function *() {
    var pkg = yield Pkg.findOne({ _id: req.params.pid });
    if (!pkg) {
      return res.status(404).json({
        err: [{ msg: 'PkgNotFound' }],
      });
    }

    if (pkg.owner.toString() !== req.user.id.toString()) {
      return res.status(401).json({
        err: [{ msg: 'PermissionDenied' }],
      });
    }

    let bookmark = new Bookmark({
      title: req.body.title,
      url: req.body.url,
      pkg: pkg,
    });
    bookmark = yield bookmark.save();
    return res.status(201).json({
      _id: bookmark._id,
      title: bookmark.title,
      url: bookmark.url,
      pkg: bookmark.pkg,
      createDate: bookmark.createDate,
    });
  }).catch(function (err) {
    logger.error(err);
    return res.status(500).json({
      err: [{ msg: 'InternalError' }],
    });
  });
});

module.exports = router;
