// 3rd party libs
const fs = require('fs');
const join = require('path').join;
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const moment = require('moment');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Own modules
const config = require('./config');

const port = process.env.PORT || 3000;
const models = join(__dirname, 'models');


// Init
var app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(passport.initialize());

// Bootstrap models
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => require(join(models, file)));

// Passport JWT
const User = mongoose.model('User');
var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: config.secret
};
passport.use(new JwtStrategy(opts, function (jwtPayload, done) {
  User.findOne({email: jwtPayload.sub}).then(function (user) {
    if (user) return done(null, user);
    return done(null, false);
  }).catch(function (err) {
    return done(err, false);
  });
}));


// Bootstrap routes
var apiRouter = express.Router();
app.use('/api', apiRouter);

// Routes
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
apiRouter.use('/auth', authRouter);
apiRouter.use('/user', userRouter);

// Email verification
app.get('/email-verification/:code', function (req, res) {
  if (!req.params.code) {
    return res.json({
      err: 'Verification code was not provided.',
    });
  }
  User.findOne({ verificationCode: req.params.code }).then(function (user) {
    var timeDiff = moment.duration(moment().diff(moment(user.vcCreated))).asHours();
    if (!user || user.verified || timeDiff > 24) {
      return res.json({
        err: 'Validation code is not valid.',
      });
    }
    user.verificationCode = '';
    user.verified = true;
    user.save();
    return res.json({
      err: '',
    });
  });
});

// Test api
apiRouter.get('/test', function (req, res) {
  res.json({
    err: '',
  });
});

connect()
  .on('error', console.log)
  .on('disconnected', connect)
  .once('open', listen);

function listen () {
  if (app.get('env') === 'test') return;
  app.listen(port);
  console.log('Express app started on port ' + port);
}

function connect () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  return mongoose.connect(config.dbURI, options).connection;
}
