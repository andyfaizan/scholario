const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const opts = {
  discriminatorKey: 'type',
};


const EventSchema = new Schema({
  createDate: { type: Date, default: Date.now },
  seen: { type: Boolean, default: false },
  seenDate: { type: Date },
}, opts);

const QuestionCreatedEventSchema = new Schema({
  by: { type: ObjectId, ref: 'User' },
  question: { type: ObjectId, ref: 'Question' },  
}, opts);

const QuestionGotAnsweredEventSchema = new Schema({
  user: { type: ObjectId, ref: 'User' },
  by: { type: ObjectId, ref: 'User' },
  question: { type: ObjectId, ref: 'Question' },  
  answer: { type: ObjectId, ref: 'Answer' },
}, opts);

const Event = mongoose.model('Event', EventSchema);
Event.discriminator('QuestionCreatedEvent', QuestionCreatedEventSchema);
Event.discriminator('QuestionGotAnsweredEvent', QuestionGotAnsweredEventSchema);
