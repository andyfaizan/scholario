const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;



const QuestionSchema = new Schema({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  courseInstance: { type: ObjectId, ref: 'CourseInstance' },
  pkg: { type: ObjectId, ref: 'Pkg' },
  material: { type: ObjectId, ref: 'Material' },
  user: { type: ObjectId, ref: 'Student' },
  createDate: { type: Date, default: Date.now },
  answers: [{ type: ObjectId, ref: 'Answer' }],
  votes: [{
    user: { type: ObjectId, ref: 'Student' },
    voteDate: { type: Date },
    value: { type: Number, default: 1 },
  }],
});


mongoose.model('Question', QuestionSchema);
