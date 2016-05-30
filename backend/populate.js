const fs = require('fs');
const join = require('path').join;
const mongoose = require('mongoose');
const parse = require('csv-parse/lib/sync');
const co = require('co');
const passwordGenerator = require('password-generator');
const config = require('./config/config');

const models = join(__dirname, 'models');
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => require(join(models, file)));

const Student = mongoose.model('Student');
const CourseInstance = mongoose.model('CourseInstance');
const University = mongoose.model('University');
const Program = mongoose.model('Program');

var data = fs.readFileSync('teilnehmeranalysis.csv');

connect()
  .on('error', console.log)
  .on('disconnected', connect)
  .once('open', listen);

function listen () {
  co(function *() {
    var courseInstance = yield CourseInstance.findOne({ _id: '5733501d889847070578ed56' });
    var records = parse(data);
    for (var i = 1; i < records.length; i++) {
      var name = records[i][1].split(', ');
      var university = yield University.findOne({ _id: '56fbd94a9b05608e04ab47fd' });
      var program = yield Program.findOne({ _id: records[i][2] === 'BIS' ? '574c0279988d1e85bbca88b1' : '5710dbb489e3c588305896df' });
      var password = passwordGenerator();
      var user = Student({
        firstname: name[1],
        lastname: name[0],
        email: records[i][3],
        verified: true,
        universities: [university],
        programs: [program],
      });
      yield user.updatePassword(password);
      user = yield user.save();
      courseInstance.participants.push(user._id);
      courseInstance = yield courseInstance.save();

      var mailOpts = {
        from: '"Scholario" <noreply@scholario.de>',
        to: user.email,
        subject: 'Account created',
        text: 'Dear ',
      };
      //mailer.transporter.sendMail(mailOpts).catch(function (err) {
        //logger.error(err);
      //});
    }
  }).catch(function (err) {
    console.log(err);
  });
}

function connect () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  return mongoose.connect(config.dbURI, options).connection;
}
