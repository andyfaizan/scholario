const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;



const AnswerSchema = new Schema({
  content: { type: String, default: '' },
  //question: { type: ObjectId, ref: 'Question' },
  user: { type: ObjectId, ref: 'User' },
  createDate: { type: Date, default: Date.now },
  //bestAnswer: { type: Boolean, default: false },
  //approved: { type: Boolean, default: false },
  votes: [{
    user: { type: ObjectId, ref: 'User' },
    voteDate: { type: Date },
    value: { type: Number, default: 1 },
  }],
});

AnswerSchema.pre('remove', function (next) {
  this.model('Question').update(
    { answers: this._id },
    { $pull: { answers: this._id } },
    next
  )
});

mongoose.model('Answer', AnswerSchema);
