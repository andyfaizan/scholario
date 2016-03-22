const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  username: { type: String, default: '' },
  password: { type: String, default: ''},
  salt: { type: String, default: ''},
});

UserSchema.methods.updatePassword = function (password) {
  return new Promise((resolve, reject) => {
    if (!password) reject(Error('Password empty'));
    bcrypt.genSalt(10, (err, salt) => {
      if (err) reject(err);
      this.salt = salt;
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) reject(err);
        this.password = hash;
        resolve();
      });
    });
  });
};

UserSchema.methods.authenticate = function (password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, res) => {
      if (err) reject(err);
      if (!res) reject(Error('User/Password incorrect.'));
      resolve();
    });
  });
};

mongoose.model('User', UserSchema);
