import mongoose from 'mongoose';
import schemaOptions from '../../utils/schemaOptions.js';

const Schema = mongoose.Schema;

const boardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    columns: [{ type: mongoose.Types.ObjectId, ref: 'Column' }],
  },
  schemaOptions()
);

const Board = mongoose.model('Board', boardSchema);

export default Board;
