// 3rd party libs
const fs = require('fs');
const join = require('path').join;
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const moment = require('moment');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Own modules
const config = require('./config/config');

const port = process.env.PORT || 3000;
const models = join(__dirname, 'models');


// Init
var app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.raw({limit: '50mb'}));
app.use(expressValidator());
app.use(morgan('dev'));
app.use(passport.initialize());

// Bootstrap models
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => require(join(models, file)));

// Passport JWT
const User = mongoose.model('User');
const Student = mongoose.model('Student');
const Prof = mongoose.model('Prof');
var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: config.secret
};
passport.use(new JwtStrategy(opts, function (jwtPayload, done) {
  var findP;
  if (jwtPayload.role === 'Student') {
    findP = Student.findOne({ email: jwtPayload.sub });
  } else if (jwtPayload.role === 'Prof') {
    findP = Prof.findOne({ email: jwtPayload.sub });
  }
  findP.then(function (user) {
    if (user) return done(null, user);
    return done(null, false);
  }).catch(function (err) {
    return done(err, false);
  });
}));


// Bootstrap routes
app.options('*', cors());

var apiRouter = express.Router();
app.use(config.urlPrefix, apiRouter);

// Routes
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const courseRouter = require('./routes/course');
const questionRouter = require('./routes/question');
const studentRouter = require('./routes/student');
const materialRouter = require('./routes/material');
const universityRouter = require('./routes/university');
const programRouter = require('./routes/program');
apiRouter.use('/auth', authRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/courses', courseRouter);
apiRouter.use('/questions', questionRouter);
apiRouter.use('/students', studentRouter);
apiRouter.use('/materials', materialRouter);
apiRouter.use('/universities', universityRouter);
apiRouter.use('/programs', programRouter);

// Email verification
app.get('/email-verification/:code', function (req, res) {
  req.checkParams('code', 'InvalidCode').isLength({min: 96, max: 96});

  var errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      'err': errors
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
    return res.status(200).json({
      err: [],
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
