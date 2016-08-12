const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const utils = require('../utils');
const Course = mongoose.model('Course');

var router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }),
  utils.hasPermission('Professor'), function (req, res) {
    Course
      .find({ prof: req.user._id })
      .populate('prof university')
      .exec()
      .then(function (courses) {
        const data = [];
        for (let i = 0; i < courses.length; i++) {
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
