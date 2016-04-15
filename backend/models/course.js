const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;



const CourseSchema = new Schema({
  name: { type: String, default: '' },
  university: { type: ObjectId, ref: 'University' },
  program: { type: ObjectId, ref: 'Program' },
  prof: { type: ObjectId, ref: 'Prof' },
  participants: [{ type: ObjectId, ref: 'Student' }], // Duplicate with user.courses
  materialsRoot: { type: String, default: '' },
});


mongoose.model('Course', CourseSchema);
