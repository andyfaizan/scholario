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
const logger = require('./logger');
const mailer = require('./mailer');
const utils = require('./utils');

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
const usersRouter = require('./routes/users');
const courseInstanceRouter = require('./routes/course-instance');
const questionRouter = require('./routes/question');
const answerRouter = require('./routes/answer');
const studentRouter = require('./routes/student');
const pkgRouter = require('./routes/pkg');
const materialRouter = require('./routes/material');
const universityRouter = require('./routes/university');
const programRouter = require('./routes/program');
const bookmarkRouter = require('./routes/bookmark');
apiRouter.use('/auth', authRouter);
apiRouter.use('/user', userRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/course-instances', courseInstanceRouter);
apiRouter.use('/questions', questionRouter);
apiRouter.use('/answers', answerRouter);
apiRouter.use('/students', studentRouter);
apiRouter.use('/pkgs', pkgRouter);
apiRouter.use('/materials', materialRouter);
apiRouter.use('/universities', universityRouter);
apiRouter.use('/programs', programRouter);
apiRouter.use('/bookmarks', bookmarkRouter);

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
  }).catch(function (err) {
    logger.error(err);
    return res.status(500).json({
      err: [{
        msg: 'InternalError'
      }]
    });
  });
});

apiRouter.post('/feedback', passport.authenticate('jwt', {session: false}), function (req, res) {
  req.checkBody('subject', 'InvalidSubject').notEmpty();
  req.checkBody('content', 'InvalidContent').notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      'err': errors
    });
  }

  const Feedback = mongoose.model('Feedback');

  var feedback = Feedback({
    subject: req.body.subject,
    content: req.body.content,
    user: req.user,
  }).save().then(function (feedback) {
    var mailOpts = {
      from: '"Scholario" <noreply@scholario.de>',
      to: 'info@scholario.de',
      subject: `[Feedback] ${req.body.subject}`,
      text: req.body.content,
    };

    if (utils.getEnv() === 'production') {
      mailer.transporter.sendMail(mailOpts).catch(function (err) {
        logger.error(err);
      });
    } else if (utils.getEnv() === 'development') {
      logger.debug(req.body.subject, req.body.content);
    }
    return res.json({});
  }).catch(function (err) {
    logger.error(err);
    return res.status(500).json({
      err: [{ msg: 'InternalError' }],
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
