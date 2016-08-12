const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const opts = {
  discriminatorKey: 'type',
};


const SolutionSchema = new Schema({
  user: { type: ObjectId, ref: 'User' },
  createDate: { type: Date, default: Date.now },
  modifyDate: { type: Date },
  grade: {
    from: { type: Number, default: 0 },
    to: { type: Number, default: 100 },
    acquired: { type: Number, default: 0 },
  },
}, opts);

const FileSolutionSchema = new Schema({
  filePath: { type: String, default: '' },
  assignment: { type: ObjectId, ref: 'Assignment' },
}, opts);

const InteractiveSolutionSchema = new Schema({
  taskSolutions: [{
    task: { type: ObjectId, ref: 'Task' },
    type: { type: String, enum: ['multipleChoice', 'text'] },
    choice: { type: Number, default: 0 },
    text: { type: String, default: '' },
  }],
}, opts);

const Solution = mongoose.model('Solution', SolutionSchema);
Solution.discriminator('FileSolutionSchema', FileSolutionSchema);
Solution.discriminator('InteractiveSolutionSchema', InteractiveSolutionSchema);
