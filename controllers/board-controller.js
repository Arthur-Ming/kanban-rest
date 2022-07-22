const Board = require("../models/board");
const Column = require("../models/column");
const Task = require("../models/task");
const createPath = require("../helpers/create-path");

const getAllBoards = async (req, res) => {
  const boards = await Board.find();
  res.send(boards);
};

const getBoardById = async (req, res) => {
  const { boardId } = req.params;
  const board = await Board.findById(boardId);
  const columns = await Column.find({ boardId }).sort({ order: 1 });
  const tasks = await Task.find({ boardId }).sort({ order: 1 });
  const columnsWithTasks = columns.map(({ title, _id, boardId, order }) => ({
    order,
    title,
    _id,
    boardId,
    tasks: tasks.filter((task) => task.columnId === _id.toString()),
  }));

  const { _id, title, description } = board;
  res.send({ _id, title, description, columns: columnsWithTasks });
  // res.send(board);
};

const creatBoard = (req, res) => {
  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });
  req.on("end", () => {
    const { title, description } = JSON.parse(data.toString());
    const board = new Board({ title, description });
    board
      .save()
      .then((result) => res.status(201).send(result))
      .catch((error) => {
        console.log(error);
      });
  });
};

module.exports = {
  getAllBoards,
  getBoardById,
  creatBoard,
};
