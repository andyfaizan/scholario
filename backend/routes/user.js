const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const url = require('url');
const multer = require('multer');
const passport = require('passport');
const co = require('co');
const logger = require('../logger');
const User = mongoose.model('User');

var router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), function (req, res) {
  co(function *() {
    var user = yield User.findOne({ _id: req.user._id })
                         .populate([{
                           path: 'universities',
                           select: 'id name',
                         }, {
                           path: 'programs',
                           select: 'id name university degree',
                         }]);

    if (!user) {
      return res.status(404).json({
        err: [{ msg: 'UserNotFound' }],
      });
    }

    const courseInstances = yield user.getCourseInstances({
      select: 'id prof course semester',
      populate: [{
        path: 'course',
        select: 'name university program',
        populate: [{
          path: 'university',
          select: 'id name',
        }, {
          path: 'program',
          select: 'id name university degree',
        }],
      }, {
        path: 'prof',
        select: 'firstname lastname role universities programs',
        populate: [{
          path: 'universities',
          select: 'name',
        }, {
          path: 'programs',
          select: 'name university degree',
        }],
      }],
      lean: true,
      limit: 5,
    });

    const questions = yield user.getQuestions({
      populate: [{
        path: 'user',
        select: 'id firstname lastname',
      }],
      select: 'id title course user createDate votes',
      lean: true,
      limit: 5,
    });

    const followings = yield user.getFollowings({
      populate: [{
        path: 'program',
        select: 'id name university degree',
      }, {
        path: 'university',
        select: 'id name',
      }, {
        path: 'universities',
        select: 'id name',
      }],
      select: 'id firstname lastname universities programs',
      lean: true,
      limit: 5,
    });

    const followers = yield user.getFollowers({
      populate: [{
        path: 'program',
        select: 'id name university degree',
      }, {
        path: 'university',
        select: 'id name',
      }, {
        path: 'universities',
        select: 'id name',
      }],
      select: 'id firstname lastname universities programs',
      lean: true,
      limit: 5,
    });

    const suggestions = yield user.getSuggestions({
      populate: [{
        path: 'program',
        select: 'id name university degree',
      }, {
        path: 'university',
        select: 'id name',
      }, {
        path: 'universities',
        select: 'id name',
      }],
      select: 'id firstname lastname universities programs',
      lean: true,
      limit: 5,
    });

    const activities = yield user.getEvents('activities', {
      lean: true,
      limit: 5,
    });

    const data = {
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      bio: user.bio,
      role: user.role,
      courseInstances: courseInstances,
      questions: questions,
      followings: followings,
      followers: followers,
      suggestions: suggestions,
      universities: user.universities,
      programs: user.programs,
      activities: activities,
    };

    if (user.avatarPath) {
      const avatarName = path.basename(user.avatarPath);
      const avatarUrl = url.format({
        protocol: 'http',
        slashes: true,
        host: 'uploads.scholario.de',
        pathname:
        `/users/${user._id}/photos/${avatarName}`
      });
      data.avatarUrl = avatarUrl;
    }

    return res.json(data);
  }).catch(function (err) {
    logger.error(err);
    return res.status(500).json({
      err: [{ msg: 'InternalError' }],
    });
  });
});

router.put('/', passport.authenticate('jwt', { session: false }), function (req, res) {
  if (req.body.firstname) req.checkBody('firstname', 'InvalidFirstname').notEmpty();
  if (req.body.lastname) req.checkBody('lastname', 'InvalidLastname').notEmpty();
  if (req.body.password) req.checkBody('password', 'InvalidPassword').notEmpty();
  if (req.body.bio) req.checkBody('bio', 'InvalidBio').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      err: errors,
    });
  }

  co(function *() {
    var user = yield User.findOne({ _id: req.user._id });

    if (req.body.firstname) user.firstname = req.body.firstname;
    if (req.body.lastname) user.lastname = req.body.lastname;
    if (req.body.bio) user.bio = req.body.bio;
    if (req.body.password) {
      yield user.updatePassword(req.body.password);
    }

    user = yield user.save();
    return res.status(200).json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      bio: user.bio,
    });
  }).catch(function (err) {
    logger.error(err);
    return res.status(500).json({
      err: [{ msg: 'InternalError' }],
    });
  });
});

router.post('/avatar', passport.authenticate('jwt', { session: false }),
  multer({ dest: 'uploads/tmp' }).single('avatar'),
  function (req, res) {
  if (!req.file) {
    return res.status(201).json({});
  }

  const avatarRoot = path.join(
    path.dirname(__dirname), 'uploads',
    'users', req.user.id, 'photos'
  );
  fse.mkdirs(avatarRoot, function (err) {
    if (err) {
      logger.error(err);
      return res.status(500).json({
        err: [{ msg: 'InternalError' }],
      });
    }

    const avatarPath = path.join(avatarRoot, req.file.originalname);
    var source = fs.createReadStream(req.file.path);
    var dest = fs.createWriteStream(avatarPath);

    source.pipe(dest);
    source.on('end', () => {
      fs.unlinkSync(req.file.path);
      req.user.avatarPath = avatarPath;
      req.user.save();
      const avatarUrl = url.format({
        protocol: 'http',
        slashes: true,
        host: 'uploads.scholario.de',
        pathname:
        `/users/${req.user._id}/photos/${req.file.originalname}`
      });
      return res.status(201).json({
        _id: req.user._id,
        avatarUrl,
      });
    });
    source.on('error', err => {
      logger.error(err);
      return res.status(500).json({
        err: [{ msg: 'InternalError' }],
      });
    });
  });
});


module.exports = router;
