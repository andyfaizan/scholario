const winston = require('winston');


var logger = new (winston.Logger)({
  exitOnError: false,
  transports: [
    new (winston.transports.File)({
      name: 'error-log',
      filename: 'log/err.log',
      level: 'error',
    }),
    new (winston.transports.File)({
      name: 'info-log',
      filename: 'log/info.log',
      level: 'info',
    }),
    new (winston.transports.Console)({
      level: 'debug',
    }),
  ],
});

module.exports = logger;
