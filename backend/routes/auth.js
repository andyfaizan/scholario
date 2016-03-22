const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = mongoose.model('User');

var router = express.Router();


router.post('/login', function (req, res) {
  var findP = User.findOne({'email': req.body.email});
  var authP = findP.then(function (user) {
    return user.authenticate(req.body.password);
  });
  Promise.all([findP, authP]).then(function (values) {
    var user = values[0];
    var token = jwt.sign({'sub': user.email}, config.secret, {
      expresInMinutes: 1440
    });
    return res.json({
      err: '',
      token: token,
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
