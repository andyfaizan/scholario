const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
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

  Material
    .findOne({ _id: req.params.mid })
    .select('name ext size pkg createDate')
    .populate([{
      path: 'pkg',
      select: 'name owner courseInstance createDate',
    }])
    .lean(true)
    .exec()
    .then(function (material) {
    if (!material) {
      return res.status(404).json({
        err: [{ msg: 'MaterialNotFound' }],
      });
    }

    return res.json(material);
  }).catch(function (err) {
    logger.error(err);
    return res.status(500).json({
      err: [{ msg: 'InternalError' }],
    });
  });
});

module.exports = router;
