const fs = require('fs');
const join = require('path').join;
const mongoose = require('mongoose');
const parse = require('csv-parse/lib/sync');
const co = require('co');
const passwordGenerator = require('password-generator');
const config = require('./config/config');
const mailer = require('./mailer');

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
    var courseInstance = yield CourseInstance.findOne({ _id: '574bfb5f667b9cb671ec2e12' });
    var records = parse(data);
    for (var i = 1; i < records.length; i++) {
      var name = records[i][1].split(', ');
      var university = yield University.findOne({ _id: '57209234ed88f1b688ddf817' });
      var program = yield Program.findOne({ _id: records[i][2] === 'BIS' ? '574bf9b834ce5aec0d1714a0' : '574bf99a34ce5aec0d17149f' });
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

      console.log(user, password);
      var mailOpts = {
        from: '"Scholario" <noreply@scholario.de>',
        to: user.email,
        subject: 'Accountinformation für Scholario',
        text: `Hi,
        
schön, dass du an unserem Prototyp für Scholario teilnimmst.

Zur Aktivierung deines Accounts melde dich bitte mit folgenden Benutzerdaten auf www.scholario.de an.

${user.email}
${password}

Bitte ändere Dein Passwort. Das kannst du nach dem Einloggen, wenn du auf deinen Namen klickst. 

Hinweise zur Nutzung: 
- es ist ein Prototyp und kann daher zu Fehlern kommen
- falls dich etwas stört hinterlasse uns ein Feedback oder schreibe uns auf info@scholario.de
- für eine optimale Nutzung empfehlen wir Google Chrome

Liked uns auf Facebook (https://www.facebook.com/scholario/ ) um über Neuerungen zu erfahren. 

Wir wünschen Dir viel Spaß mit unserem neuen Produkt und viel Erfolg bei der Klausur!

Euer`};
      mailer.transporter.sendMail(mailOpts).catch(function (err) {
        console.log(err);
      });
    }
    return 1
  }).catch(function (err) {
    console.log(err);
  });
}

function connect () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  return mongoose.connect(config.dbURI, options).connection;
}
