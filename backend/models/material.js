const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;



const MaterialSchema = new Schema({
  name: { type: String, required: true, default: '' },
  root: { type: String, default: '' },
  owner: { type: ObjectId, ref: 'User' },
  course: { type: ObjectId, required: true, ref: 'Course' },
  createDate: { type: Date, default: Date.now },
  modifiedDate: { type: Date },
});

MaterialSchema.index({ name: 1, course: 1 }, { unique: true });

mongoose.model('Material', MaterialSchema);
