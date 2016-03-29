Userconst mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;



const AnswerSchema = new Schema({
  content: { type: String, default: '' },
  question: { type: ObjectId, ref: 'Question' },
  user: { type: ObjectId, ref: 'Student' },
  createDate: { type: Date, default: Date.now },
  bestAnswer: { type: Boolean, default; false },
  votes: [{
    user: { type: ObjectId, ref: 'Student' },
    voteDate: { type: Date },
  }],
});


mongoose.model('Answer', AnswerSchema);
