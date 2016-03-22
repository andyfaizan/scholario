const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = mongoose.model('User');

var router = express.Router();


router.post('/login', function (req, res) {
  User.findOne({'email': req.body.email}).then(function (user) {
    return user.authenticate(req.body.password)
  }).then(function () {
    return res.json({
      err: '',
    });
  }).catch(function (err) {
    return res.json({
      err: err.message
    });
  });
});

router.post('/signup', function (req, res) {
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

module.exports = router;
