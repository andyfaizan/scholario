const winston = require('winston');



var logger = new (winston.Logger)({
  exitOnError: false,
  transports: [
    new (winston.transports.Console)({
      level: 'debug',
    }),
    new (winston.transports.File)({
      name: 'info-log',
      filename: 'info.log',
      level: 'info'
    }),
    new (winston.transports.File)({
      name: 'error-log',
      filename: 'err.log',
      level: 'error',
    })
  ]
});

module.exports = logger;
