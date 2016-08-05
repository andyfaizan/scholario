const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const PkgSchema = new Schema({
  name: { type: String, required: true, default: '' },
  owner: { type: ObjectId, ref: 'User' },
  courseInstance: { type: ObjectId, required: true, ref: 'CourseInstance' },
  access: { type: String, enum: ['private', 'friends', 'public'], default: 'public' },
  createDate: { type: Date, default: Date.now },
  modifiedDate: { type: Date },
});

PkgSchema.index({ name: 1, courseInstance: 1 }, { unique: true });

PkgSchema.pre('remove', function (next) {
  this.model('Material').remove(
    { pkg: this._id },
    next
  );
});


mongoose.model('Pkg', PkgSchema);
