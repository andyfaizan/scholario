// 3rd party libs
const fs = require('fs');
const join = require('path').join;
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Own modules
const config = require('./config');

const port = process.env.PORT || 3000;
const models = join(__dirname, 'models');


// Init
var app = express();
app.use(helmet());
app.use(bodyParser.json());

// Bootstrap models
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => require(join(models, file)));

// Bootstrap routes
var apiRouter = express.Router();
app.use('/api', apiRouter);

// Routes
const authRoutes = require('./routes/auth');
apiRouter.use('/auth', authRoutes);

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
