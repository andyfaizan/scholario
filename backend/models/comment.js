const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const CommentSchema = new Schema({
  content: { type: String, default: '' },
  // answer: { type: ObjectId, ref: 'Answer' },
  // question: { type: ObjectId, ref: 'Question' },
  user: { type: ObjectId, ref: 'User' },
  createDate: { type: Date, default: Date.now },
  modifyDate: { type: Date },
  votes: [{
    user: { type: ObjectId, ref: 'User' },
    voteDate: { type: Date },
    value: { type: Number, default: 1 },
  }],
});

CommentSchema.pre('remove', function (next) {
  this.model('Answer').update(
    { comments: this._id },
    { $pull: { comments: this._id } },
    next
  );
});

mongoose.model('Comment', CommentSchema);
