const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const opts = {
  discriminatorKey: 'type',
};


const TaskSchema = new Schema({
  instruction: { type: String, default: '' },
  createDate: { type: Date, default: Date.now },
  modifyDate: { type: Date },
}, opts);

const MultipleChoiceTaskSchema = new Schema({
  choices: [{
    description: { type: String, default: '' },
  }],
}, opts);

const TextTaskSchema = new Schema({
}, opts);

const Task = mongoose.model('Task', TaskSchema);
Task.discriminator('MultipleChoiceTask', MultipleChoiceTaskSchema);
Task.discriminator('TextTask', TextTaskSchema);
