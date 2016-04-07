module.exports = {
  secret: 'verySecret',
  dbURI: 'mongodb://localhost/scholario',
  smtpConfig: {
    host: 'scholario.de',
    port: 25,
    secure: false,
    auth: {
      user: 'noreply',
      pass: ''
    }
  },
};
