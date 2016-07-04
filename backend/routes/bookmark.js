const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const logger = require('../logger');
const Bookmark = mongoose.model('Bookmark');

var router = express.Router();


router.delete('/:bid', passport.authenticate('jwt', {session: false}), function (req, res) {
  req.checkParams('bid', 'InvalidBookmarkId').notEmpty().isMongoId();

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      err: errors,
    });
  }
  Bookmark.findOne({ _id: req.params.bid }).populate('pkg').then(function (bookmark) {
    if (!bookmark) {
      return res.status(404).json({
        err: [{ msg: 'BookmarkNotFound' }],
      });
    }
    if (bookmark.pkg.owner.toString() !== req.user.id.toString()) {
      return res.status(401).json({
        err: [{ msg: 'PermissionDenied' }],
      });
    }

    return bookmark.remove();
  }).then(function () {
    return res.status(200).json({});
  }).catch(function (err) {
    logger.error(err);
    return res.status(500).json({
      err: [{ msg: 'InternalError' }],
    });
  });
});

module.exports = router;
