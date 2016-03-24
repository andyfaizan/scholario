const nodemailer = require('nodemailer');
const config = require('./config');


var transporter = nodemailer.createTransport(config.mailURI);
module.exports = {
  transporter: transporter,
};
