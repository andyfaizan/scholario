/* global Promise */
const mongoose = require('mongoose');
const url = require('url');
const path = require('path');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const MaterialSchema = new Schema({
  name: { type: String, required: true, default: '' },
  ext: { type: String, default: '' },
  mimetype: { type: String, default: '' },
  size: { type: Number, default: 0 },
  pkg: { type: ObjectId, ref: 'Pkg' },
  votes: [{
    user: { type: ObjectId, ref: 'User' },
    voteDate: { type: Date },
    value: { type: Number, default: 1 },
  }],
  createDate: { type: Date, default: Date.now },
  modifiedDate: { type: Date },
});

MaterialSchema.index({ name: 1, ext: 1, pkg: 1 }, { unique: true });

MaterialSchema.methods.getPath = function () {
  return new Promise((resolve, reject) => {
    this.model('Pkg').findOne({ _id: this.pkg }).then(pkg => {
      this.model('CourseInstance').findOne({ _id: pkg.courseInstance }).then(ci => {
        const materialPath = path.join(
          ci.pkgsRoot, pkg._id, `${this.name}.${this.ext}`
        );
        return resolve(materialPath);
      }).catch(err => reject(err));
    }).catch(err => {
      return reject(err);
    });
  });
};

MaterialSchema.methods.getUrl = function () {
  return new Promise((resolve, reject) => {
    this.model('Pkg').findOne({ _id: this.pkg }).then(pkg => {
      this.model('CourseInstance').findOne({ _id: pkg.courseInstance }).then(ci => {
        const materialUrl = url.resolve(
          'http://uploads.scholario.de',
          `/${ci._id}/${pkg._id}/${this.name}.${this.ext}`
        );
        return resolve(materialUrl);
      }).catch(err => reject(err));
    }).catch(err => {
      return reject(err);
    });
  });
};

mongoose.model('Material', MaterialSchema);
