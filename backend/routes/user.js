const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
var _ = require('lodash');
const User = mongoose.model('User');

var router = express.Router();



router.get('/:username', passport.authenticate('jwt', {session: false}), function (req, res) {
  User.findOne({ username: req.params.username }).then(function (user) {
    if (!user) throw(Error('User not found'));
    return res.json({
      name: user.name,
      username: user.username
    });
  }).catch(function (err) {
    return res.json({
      err: err.message,
    });
  });
});

router.get('/', passport.authenticate('jwt', {session: false}), function (req, res) {
  return res.json({
    username: req.user.username,
  });
});

router.post('/', function (req, res) {
  var user = new User({
    email: req.body.email,
    username: req.body.username,
  });
  user.updatePassword(req.body.password).then(function () {
    return user.save();
  }).then(function (user) {
    return res.json({
      err: ''
    });
  }).catch(function (err) {
    console.log(err);
    return res.json({
      err: err.message,
    });
  });

});

router.put('/', passport.authenticate('jwt', {session: false}), function (req, res) {
  _.forOwn(req.body, function (v, k) {
    req.user.set(k, v);
  });
  req.user.save().then(function (user) {
    return res.json({
      err: '',
    });
  }).catch(function (err) {
    return res.json({
      err: err.message,
    });
  });
});

module.exports = router;
