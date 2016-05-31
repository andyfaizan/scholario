const mongoose = require('mongoose');
const path = require('path');
const url = require('url');
const co = require('co');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;



const MaterialSchema = new Schema({
  name: { type: String, required: true, default: '' },
  ext: { type: String, default: '' },
  mimetype: { type: String, default: '' },
  size: { type: Number, default: 0 },
  pkg: { type: ObjectId, ref: 'Pkg' },
  createDate: { type: Date, default: Date.now },
  modifiedDate: { type: Date },
});

MaterialSchema.index({ name: 1, ext: 1, pkg: 1, }, { unique: true });

MaterialSchema.methods.getPath = function () {
  return new Promise((resolve, reject) => {
    this.model('Pkg').findOne({ _id: this.pkg }).then(pkg => {
      this.model('CourseInstance').findOne({ _id: pkg.courseInstance }).then(ci => {
        const path = path.join(
          ci.pkgsRoot, pkg._id, `${this.name}.${this.ext}`
        );
        return resolve(path);
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
        const path = url.resolve(
          'http://uploads.scholario.de',
          `/${ci._id}/${pkg._id}/${this.name}.${this.ext}`
        );
        return resolve(path);
      }).catch(err => reject(err));
    }).catch(err => {
      return reject(err);
    });
  });
};

mongoose.model('Material', MaterialSchema);
