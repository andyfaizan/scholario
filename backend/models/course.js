const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const curYear = () => moment().year();
const CourseSchema = new Schema({
  name: { type: String, default: '' },
  alias: { type: String, default: '' },
  university: { type: ObjectId, ref: 'University' },
  program: { type: ObjectId, ref: 'Program' },
});

const CourseInstanceSchema = new Schema({
  course: { type: ObjectId, ref: 'Course' },
  description: { type: String, default: '' },
  prof: { type: ObjectId, ref: 'Prof' },
  assistants: [{ type: ObjectId, ref: 'User' }],
  semester: {
    year: { type: Number, default: curYear, min: 2010, max: 2020 },
    term: { type: String, default: 'WS' },
  },
  participants: [{ type: ObjectId, ref: 'Student' }], // Duplicate with user.courses
  pkgsRoot: { type: String, default: '' },
});


CourseSchema.index({ name: 1, university: 1, program: 1 }, { unique: true });

mongoose.model('Course', CourseSchema);
mongoose.model('CourseInstance', CourseInstanceSchema);
