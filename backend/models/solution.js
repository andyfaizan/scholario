const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const opts = {
  discriminatorKey: 'type',
};


const SolutionSchema = new Schema({
  user: { type: ObjectId, ref: 'User' },
  assignment: { type: ObjectId, ref: 'Assignment' },
  createDate: { type: Date, default: Date.now },
  modifyDate: { type: Date },
  grade: { type: Number, default: 0 },
  comment: { type: String, default: '' },
  graded: { type: Boolean, default: false },
}, opts);

const FileSolutionSchema = new Schema({
  filePath: { type: String, default: '' },
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
Solution.discriminator('FileSolution', FileSolutionSchema);
Solution.discriminator('InteractiveSolution', InteractiveSolutionSchema);
