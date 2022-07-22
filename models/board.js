const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: "",
    },
  },
  {
    versionKey: false,
  }
);

const Board = mongoose.model("Board", boardSchema);

module.exports = Board;
