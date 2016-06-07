const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const multer = require('multer');
const _ = require('lodash');
const co = require('co');
const url = require('url');
const logger = require('../logger');
const utils = require('../utils');
const Material = mongoose.model('Material');
const Pkg = mongoose.model('Pkg');

var router = express.Router();


router.get('/:mid', passport.authenticate('jwt', {session: false}), function (req, res) {
  req.checkParams('mid', 'InvalidMaterialId').notEmpty().isMongoId();

  var errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      err: errors
    });
  }

  co(function *() {
    var material = yield Material
      .findOne({ _id: req.params.mid })
      .select('name ext mimetype size pkg createDate')
      .populate([{
        path: 'pkg',
        select: 'name owner courseInstance createDate',
      }])
      .lean(true)
      .exec();

    if (!material) {
      return res.status(404).json({
        err: [{ msg: 'MaterialNotFound' }],
      });
    }

    material.url = url.format({
      protocol: 'http',
      slashes: true,
      host: 'uploads.scholario.de',
      pathname: `/courses/${material.pkg.courseInstance}/${material.pkg._id}/${encodeURIComponent(material.name)}${material.ext}`,
    });

    return res.json(material);
  }).catch(function (err) {
    logger.error(err);
    return res.status(500).json({
      err: [{ msg: 'InternalError' }],
    });
  });
});

router.delete('/:mid', passport.authenticate('jwt', {session: false}), function (req, res) {
  req.checkParams('mid', 'InvalidMaterialId').notEmpty().isMongoId();

  var errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      err: errors
    });
  }
  co(function *() {
    var material = yield Material.findOne({ _id: req.params.mid }).populate([{
      path: 'pkg',
      populate: {
        path: 'courseInstance',
      }
    }]);
    if (!material) {
      return res.status(404).json({
        err: [{ msg: 'MaterialNotFound' }],
      });
    }
    if (material.pkg.owner.toString() !== req.user.id.toString()) {
      return res.status(401).json({
        err: [{ msg: 'PermissionDenied' }],
      });
    }

    var materialPath = path.join(material.pkg.courseInstance.pkgsRoot, material.pkg.id.toString(), material.name + material.ext);
    fs.unlinkSync(materialPath);
    yield material.remove();
    return res.status(200).json({});
  }).catch(function (err) {
    logger.error(err);
    return res.status(500).json({
      err: [{ msg: 'InternalError' }],
    });
  });
});

module.exports = router;
