import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200,
    minlength: 1

  },
  description: {
    type: String,
    trim: true,
    maxlength: 1000,
    required: true
  },
  status: {
    type: String,
    enum: ['Todo', 'In Progress', 'Done'],
    default: 'Todo'
  },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  }
}, {
  timestamps: true
});
const Task = model('Task', taskSchema);

export default Task;
