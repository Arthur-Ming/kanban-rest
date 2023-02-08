import mongoose from 'mongoose';
import schemaOptions from '../../utils/schemaOptions.js';

const Schema = mongoose.Schema;

const fileSchema = new Schema(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Task',
    },
    filename: {
      type: String,
      required: true,
    },
    extension: {
      type: String,
      required: true,
    },
  },
  schemaOptions()
);

const File = mongoose.model('File', fileSchema);

export default File;
