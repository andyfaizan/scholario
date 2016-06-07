const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;



const FeedbackSchema = new Schema({
  subject: { type: String, default: '' },
  content: { type: String, default: '' },
  user: { type: ObjectId, ref: 'User' },
  createDate: { type: Date, default: Date.now },
});


mongoose.model('Feedback', FeedbackSchema);
