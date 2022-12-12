import Board from "../models/board.js";
import Column from "../models/column.js";
import Task from "../models/task.js";
import mongoose from "mongoose";

export const getAllBoards = async (req, res) => {
  try {
    const boards = await Board.find({}, "title description");
    res.send(boards);
  } catch (error) {
    console.log(error);
  }
};

export const getBoardById = (req, res) => {
  const { boardId } = req.params;
  Board.findById(boardId)
    .populate({
      path: "columns",
      populate: {
        path: "tasks",
      },
    })
    .exec((err, board) => {
      // if (err) return handleError(err);
      //   console.log("The author is %s", person);
      console.log(board._id);
      res.send(board);
    });
};

export const creatBoard = (req, res) => {
  const body = req.body;

  const board = new Board({
    _id: new mongoose.Types.ObjectId(),
    ...body,
  });

  board
    .save()
    .then((result) => res.status(201).send(result))
    .catch((error) => {
      console.log(error);
    });
};
