// 3rd party libs
var express = require('express');
var helmet = require('helmet');
var bodyParser = require('body-parser');

// Own modules
var authRoutes = require('./routes/auth');


// Init
var app = express();
app.use(helmet());
app.use(bodyParser.json());
var apiRouter = express.Router();
app.use('/api', apiRouter);

// Routes
apiRouter.use('/auth', authRoutes);

// Test api
apiRouter.get('/test', function (req, res) {
  res.json({
    err: '',
  });
});

// Serve
app.listen(3000, function () {
  console.log('Backend running on 3000.');
});
