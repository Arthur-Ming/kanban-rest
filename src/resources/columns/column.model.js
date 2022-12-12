import mongoose from 'mongoose';
import schemaOptions from '../../utils/schemaOptions.js';

const Schema = mongoose.Schema;

const columnSchema = new Schema(
  {
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Board',
    },
    title: {
      type: String,
      required: true,
    },
    tasks: [{ type: mongoose.Types.ObjectId, ref: 'Task' }],
  },
  schemaOptions()
);

const Column = mongoose.model('Column', columnSchema);

export default Column;
