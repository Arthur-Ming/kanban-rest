import Board from "../models/board.js";
import Column from "../models/column.js";
import Task from "../models/task.js";

export const getAllBoards = async (req, res) => {
  const boards = await Board.find();
  const columns = await Column.find().sort({ order: 1 });
  res.send(
    boards.map(({ title, description, _id }) => ({
      title,
      description,
      _id,
      columnIds: columns
        .filter(({ boardId }) => boardId === _id.toString())
        .map(({ _id }) => _id),
    }))
  );
};

export const getBoardById = async (req, res) => {
  const { boardId } = req.params;
  const { title, description, _id } = await Board.findById(boardId);
  const columns = await Column.find({ boardId });

  res.send({
    title,
    description,
    _id,
    columnIds: columns.map(({ _id }) => _id),
  });
};

export const creatBoard = (req, res) => {
  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });
  req.on("end", () => {
    const { title, description } = JSON.parse(data.toString());
    const board = new Board({ title, description, columnIds: [] });
    board
      .save()
      .then((result) => res.status(201).send(result))
      .catch((error) => {
        console.log(error);
      });
  });
};

export default {
  getAllBoards,
  getBoardById,
  creatBoard,
};
