const fs = require('fs');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const co = require('co');
const url = require('url');
const logger = require('../logger');
const Material = mongoose.model('Material');

var router = express.Router();


router.get('/:mid', passport.authenticate('jwt', { session: false }), function (req, res) {
  req.checkParams('mid', 'InvalidMaterialId').notEmpty().isMongoId();

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      err: errors,
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
      pathname:
      `/courses/${material.pkg.courseInstance}/${material.pkg._id}/${encodeURIComponent(material.name)}${material.ext}`,
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

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      err: errors,
    });
  }

  co(function *() {
    var material = yield Material.findOne({ _id: req.params.mid }).populate([{
      path: 'pkg',
      populate: {
        path: 'courseInstance',
      },
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

    const materialPath =
    path.join(material.pkg.courseInstance.pkgsRoot, material.pkg.id.toString(), material.name + material.ext);
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

router.put('/:mid/rename', passport.authenticate('jwt', { session: false }), function (req,res) {
  req.checkParams('mid', 'InvalidMaterialId').notEmpty().isMongoId();
  req.checkBody('name', 'InvalidName').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      err: errors,
    });
  }

  co(function *() {
    var material =
    yield Material.findOne({ _id: req.params.mid }).select('name pkg').populate({ path: 'pkg', select: 'owner' });
    if (!material) {
      return res.status(404).json({
        err: [{ msg: 'MaterialNotFound' }],
      });
    }
    if (material.pkg.owner !== req.user.id) {
      res.status(401).json({
        err: [{ msg: 'PermissionDenied' }],
      });
    } else {
      material.name = req.body.name;
    }
    material = yield material.save();

    return res.status(200).json({
      _id: material._id,
      name: material.name,
    });
  });
});

module.exports = router;
