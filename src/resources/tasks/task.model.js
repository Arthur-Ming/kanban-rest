import mongoose from 'mongoose';
import schemaOptions from '../../utils/schemaOptions.js';

const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Board',
    },
    columnId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Column',
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    files: [{ type: mongoose.Types.ObjectId, ref: 'File' }],
  },
  schemaOptions()
);

const Task = mongoose.model('Task', taskSchema);

export default Task;
