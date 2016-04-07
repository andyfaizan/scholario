const nodemailer = require('nodemailer');
const config = require('./config/config');


var transporter = nodemailer.createTransport(config.mailURI);
module.exports = {
  transporter: transporter,
};
