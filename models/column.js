const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const columnSchema = new Schema(
  {
    boardId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const Column = mongoose.model("Column", columnSchema);

module.exports = Column;
