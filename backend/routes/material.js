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

module.exports = router;
