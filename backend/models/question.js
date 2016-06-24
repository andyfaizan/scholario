const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;



const QuestionSchema = new Schema({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  courseInstance: { type: ObjectId, ref: 'CourseInstance' },
  pkg: { type: ObjectId, ref: 'Pkg' },
  material: { type: ObjectId, ref: 'Material' },
  user: { type: ObjectId, ref: 'User' },
  createDate: { type: Date, default: Date.now },
  bestAnswer: { type: ObjectId, ref: 'Answer' },
  approvedAnswer: { type: ObjectId, ref: 'Answer' },
  answers: [{ type: ObjectId, ref: 'Answer' }],
  votes: [{
    user: { type: ObjectId, ref: 'User' },
    voteDate: { type: Date },
    value: { type: Number, default: 1 },
  }],
  infoMailSended: { type: Boolean, default: false},
});


mongoose.model('Question', QuestionSchema);
