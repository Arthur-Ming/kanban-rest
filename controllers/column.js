import Column from "../models/column.js";
import Board from "../models/board.js";
import mongoose from "mongoose";

import createPath from "../helpers/create-path.js";

export const getAllColumns = async (req, res) => {
  const { boardId } = req.params;
  const columns = await Column.find({ boardId });
  const tasks = await Column.find({ boardId }).sort({ order: 1 });
  res.send(
    columns.map(({ boardId, _id, order, title }) => ({
      boardId,
      _id,
      order,
      title,
      taskIds: tasks
        .filter(({ columnId }) => columnId === _id.toString())
        .map(({ _id }) => _id),
    }))
  );
};

export const getColumnById = async (req, res) => {
  const { boardId, columnId } = req.params;
  // const column = await Column.findOne({ boardId, columnId });
  Column.findOne({ boardId, columnId })
    .populate("tasks")
    .exec(function (err, column) {
      // if (err) return handleError(err);
      //   console.log("The author is %s", person);

      res.send(column);
      // prints "The author is Ian Fleming"
    });
};

export const creatColumn = async (req, res) => {
  const boardId = req.params.boardId;
  const body = req.body;
  const board = await Board.findById(boardId);
  const column = new Column({
    ...body,
    _id: new mongoose.Types.ObjectId(),
    boardId: board._id,
  });
  column
    .save()
    .then((result) => {
      board.columns.push(result);
      board.save();
      res.status(201).send(result);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateColumn = (req, res) => {
  const { boardId, columnId } = req.params;

  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });
  req.on(
    "end",
    async () => {
      const { title: newTitle } = await JSON.parse(data.toString());

      findByIdAndUpdate(columnId, {
        title: newTitle,
      }).then((result) => result);
    } /* {
    const { order } = await JSON.parse(data.toString());

    const columns = await Column.find({ boardId }).sort({ order: 1 });

    const currentColumn = columns.find(
      ({ _id }) => columnId === _id.toString()
    );
    const columnsWithoutCurrent = columns.filter(
      ({ _id }) => columnId !== _id.toString()
    );

    const before = columnsWithoutCurrent.slice(0, order - 1);
    const after = columnsWithoutCurrent.slice(order - 1);

    const newOrderedColumns = [...before, currentColumn, ...after];

    newOrderedColumns.forEach(({ _id }, index) =>
      Column.findByIdAndUpdate(_id, {
        order: index + 1,
      }).then((result) => result)
    );
  } */
  );
};

export const deleteColumn = (req, res) => {
  findByIdAndDelete(req.params.columnId).then((result) => {
    res.sendStatus(200);
  });
};
