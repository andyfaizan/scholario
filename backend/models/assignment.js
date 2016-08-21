const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const opts = {
  discriminatorKey: 'type',
};


const AssignmentSchema = new Schema({
  name: { type: String, default: '' },
  courseInstance: { type: ObjectId, ref: 'CourseInstance' },
  createDate: { type: Date, default: Date.now },
  modifyDate: { type: Date },
  access: { type: String, enum: ['private', 'public'], default: 'public' },
  accessWhitelist: [{ type: ObjectId, ref: 'User' }],
}, opts);

const InteractiveAssignmentSchema = new Schema({
  tasks: [{ type: ObjectId, ref: 'Task' }],
}, opts);

const FileAssignmentSchema = new Schema({
  filePath: { type: String, default: '' },
}, opts);

const Assignment = mongoose.model('Assignment', AssignmentSchema);
Assignment.discriminator('InteractiveAssignment', InteractiveAssignmentSchema);
Assignment.discriminator('FileAssignment', FileAssignmentSchema);
