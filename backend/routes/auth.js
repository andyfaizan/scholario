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

module.exports = router;
