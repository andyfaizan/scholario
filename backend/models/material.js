const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;



const MaterialSchema = new Schema({
  name: { type: String, default: '' },
  root: { type: String, default: '' },
  owner: { type: ObjectId, ref: 'User' },
  course: { type: ObjectId, ref: 'Course' },
  createDate: { type: Date, default: Date.now },
  modifiedDate: { type: Date },
});


mongoose.model('Material', MaterialSchema);
