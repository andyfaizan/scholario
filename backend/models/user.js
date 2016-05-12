const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const logger = require('../logger');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const opts = {
  discriminatorKey: 'role',
};

const UserSchema = new Schema({
  firstname: { type: String, default: ''},
  lastname: { type: String, default: ''},
  //name: { type: String, default: '' },
  email: { type: String, required: true, unique: true, index: true, default: '' },
  username: { type: String, default: '' },
  password: { type: String, required: true, default: ''},
  salt: { type: String, default: ''},
  registerDate: { type: Date, default: Date.now },
  verified: { type: Boolean, default: false },
  verificationCode: { type: String, index: true, default: '' },
  vcCreated: { type: Date },
  //courses: [{ type: ObjectId, ref: 'Course'}], // Duplicate with course.participants
  following: [{ type: ObjectId, ref: 'User' }],
  universities: [{ type: ObjectId, ref: 'University' }],
  programs: [{ type: ObjectId, ref: 'Program' }],
}, opts);

const StudentSchema = new Schema({
  //university: { type: ObjectId, ref: 'University' },
  //program: { type: ObjectId, ref: 'Program' },
}, opts);

const ProfSchema = new Schema({
}, opts);

// Indices

// Instance methods
UserSchema.methods.updatePassword = function (password) {
  return new Promise((resolve, reject) => {
    if (!password) return reject(Error('Password empty'));
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return reject(err);
      this.salt = salt;
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) return reject(err);
        this.password = hash;
        resolve();
      });
    });
  });
};

UserSchema.methods.authenticate = function (password) {
  return new Promise((resolve, reject) => {
    if (!this.verified) {
      return reject(Error('User not verified.'));
    }
    bcrypt.compare(password, this.password, (err, res) => {
      if (err) return reject(err);
      if (!res) return reject(Error('User/Password incorrect.'));
      return resolve(this);
    });
  });
};

UserSchema.methods.getCourseInstances = function (opts) {
  const CourseInstance = mongoose.model('CourseInstance');
  return new Promise((resolve, reject) => {
    var p;
    if (this.role === 'Student') {
      p = CourseInstance.find({ participants: { $in: [this.id] } });
    } else if (this.role === 'Prof') {
      p = CourseInstance.find({ prof: this.id });
    }
    if (typeof opts !== 'undefined') {
      if ('populate' in opts)
        p = p.populate(opts.populate);
      if ('select' in opts)
        p = p.select(opts.select);
      if ('lean' in opts)
        p = p.lean(opts.lean);
      if ('limit' in opts)
        p = p.limit(opts.limit);
    }
    p.exec().then(courseInstances => resolve(courseInstances))
            .catch(err => reject(err));
  });
};

UserSchema.methods.getQuestions = function (opts) {
  const Question = mongoose.model('Question');
  const getCourseInstanceIds = (courseInstance) => courseInstance._id;
  return new Promise((resolve, reject) => {
    this.getCourseInstances({
      select: 'id',
    }).then(function (courseInstances) {
      var p = Question.find({ courseInstance: { $in: courseInstances.map(getCourseInstanceIds) } });
      if (typeof opts !== 'undefined') {
        if ('populate' in opts)
          p = p.populate(opts.populate);
        if ('select' in opts)
          p = p.select(opts.select);
        if ('lean' in opts)
          p = p.lean(opts.lean);
        if ('limit' in opts)
          p = p.limit(opts.limit);
      }
      return p.exec();
    }).then(questions => resolve(questions))
      .catch(err => reject(err));
  });
};

UserSchema.methods.getFollowings = function (opts) {
  return new Promise((resolve, reject) => {
    var p = this.model('User').find({ _id: { $in: this.following } });
    if (typeof opts !== 'undefined') {
      if ('populate' in opts)
        p = p.populate(opts.populate);
      if ('select' in opts)
        p = p.select(opts.select);
      if ('lean' in opts)
        p = p.lean(opts.lean);
      if ('limit' in opts)
        p = p.limit(opts.limit);
    }
    p.exec().then(followings => resolve(followings))
            .catch(err => reject(err));
  });
};

// Virtuals

// Validations
UserSchema.path('email').validate(function (email) {
  return validator.isEmail(email);
}, 'Email is not valid.');

const User = mongoose.model('User', UserSchema);
const Student = User.discriminator('Student', StudentSchema);
const Prof = User.discriminator('Prof', ProfSchema);
