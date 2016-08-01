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
  to: [{ type: ObjectId, ref: 'User', index: true }],
  by: { type: ObjectId, ref: 'User', index: true },
  question: { type: ObjectId, ref: 'Question' },  
}, opts);

const AnswerCreatedEventSchema = new Schema({
  to: [{ type: ObjectId, ref: 'User', index: true }],
  by: { type: ObjectId, ref: 'User', index: true },
  question: { type: ObjectId, ref: 'Question' },  
  answer: { type: ObjectId, ref: 'Answer' },
}, opts);

const UserFollowedEventSchema = new Schema({
  to: [{ type: ObjectId, ref: 'User', index: true }],
  by: { type: ObjectId, ref: 'User', index: true },
}, opts);


const Event = mongoose.model('Event', EventSchema);
Event.discriminator('QuestionCreatedEvent', QuestionCreatedEventSchema);
Event.discriminator('AnswerCreatedEvent', AnswerCreatedEventSchema);
Event.discriminator('UserFollowedEvent', UserFollowedEventSchema);
