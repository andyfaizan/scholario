const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const utils = require('../utils');
const User = mongoose.model('User');
const Course = mongoose.model('Course');

var router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }),
  utils.hasPermission('Student'), function (req, res) {
    Course
      .find({ participants: { $in: [req.user._id] } })
      .populate('prof university')
      .exec()
      .then(function (courses) {
        var data = [];
        for (var i = 0; i < courses.length; i++) {
          data.push({
            id: courses[i]._id,
            name: courses[i].name,
            university: courses[i].university.name,
            prof: courses[i].prof.name,
          });
        }
        return res.json({
          username: req.user.username,
          courses: data,
        });
      });
  });

router.get('/following', passport.authenticate('jwt', { session: false }),
  utils.hasPermission('Student'), function (req, res) {
    User
    .findOne({ _id: req.user._id })
    .populate('following')
    .exec()
    .then(function (user) {
      var data = [];
      for (var i = 0; i < user.following.length; i++) {
        data.push({
          id: user.following[i]._id,
          name: user.following[i].name,
        });
      }
      return res.json({
        following: data,
      });
    });
  });

router.get('/follower', passport.authenticate('jwt', { session: false }),
  utils.hasPermission('Student'), function (req, res) {
    User
    .find({ following: { $in: [req.user._id] } })
    .populate()
    .exec()
    .then(function (user) {
      var data = [];
      for (var i = 0; i < user.length; i++) {
        data.push({
          id: user[i]._id,
          name: user[i].name,
        });
      }
      return res.json({
        follower: data,
      });
    });
  });
/**
router.get('/notification', passport.authenticate('jwt', {session: false}),
            utils.hasPermission('Student'), function (req,res) {
  Material
    .find({ createDate: { $gte() }} $or { modifiedDate: {$gte()} })
    .populate('following')
    .exec()
    .then(function (material) {
      var data = [];
      for (var i = 0; i < material.length; i++) {
        data.push({
          id: material[i]._id,
          name: material[i].name,
          owner: matrial[i].owner._id,
          course: material.course._id,
        });
      }
      return res.json({
        notification: data,
      });
    });
}) */

module.exports = router;
