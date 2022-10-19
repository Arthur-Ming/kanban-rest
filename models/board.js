import mongoose from "mongoose";
const Schema = mongoose.Schema;

const boardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      default: "",
    },
    columnIds: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    versionKey: false,
  }
);

const Board = mongoose.model("Board", boardSchema);

export default Board;
