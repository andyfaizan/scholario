const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, default: '' },
  email: { type: String, required: true, unique: true, index: true, default: '' },
  username: { type: String, default: '' },
  password: { type: String, required: true, default: ''},
  salt: { type: String, default: ''},
  registerDate: { type: Date, default: Date.now },
  verified: { type: Boolean, default: false },
  verificationCode: { type: String, index: true, default: '' },
  vcCreated: { type: Date },
});

// Indices

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
      return resolve();
    });
  });
};

UserSchema.path('email').validate(function (email) {
  return validator.isEmail(email);
}, 'Email is not valid.');

mongoose.model('User', UserSchema);
