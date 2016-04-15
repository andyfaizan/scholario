const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;



const ProgramSchema = new Schema({
  name: { type: String, default: '' },
  description: { type: String, default: '' },
  university: { type: ObjectId, ref: 'University' },
  createDate: { type: Date, default: Date.now },
});

ProgramSchema.index({ name: 1, university: 1 }, { unique: true });

mongoose.model('Program', ProgramSchema);
