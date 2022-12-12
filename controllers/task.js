import Board from "../models/board.js";
import Column from "../models/column.js";
import Task from "../models/task.js";
import mongoose from "mongoose";

export const getAllTasks = async (req, res) => {
  const { columnId } = req.params;
  const tasks = await Task.find({ columnId });
  res.send(tasks);
};

export const creatTask = async (req, res) => {
  const { boardId, columnId } = req.params;
  const body = req.body;
  const column = await Column.findById(columnId);
  const board = await Board.findById(boardId);

  const task = new Task({
    ...body,
    _id: new mongoose.Types.ObjectId(),
    boardId: board._id,
    columnId: column._id,
  });

  task
    .save()
    .then((result) => {
      column.tasks.push(result);
      column.save();
      res.status(201).send(result);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateTask = async (req, res) => {
  const { boardId, columnId: newColumn, taskId } = req.params;
  const [task] = await Task.find({ boardId, _id: taskId });
  const oldColumn = task.columnId;
  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });
  req.on("end", async () => {
    const { order } = await JSON.parse(data.toString());

    const tasks = await Task.find({ boardId, columnId: newColumn }).sort({
      order: 1,
    });
    const currentTask = task;
    let tasksWithoutCurrent = [];

    if (oldColumn === newColumn) {
      tasksWithoutCurrent = tasks.filter(
        ({ _id }) => taskId !== _id.toString()
      );
    }
    if (oldColumn !== newColumn) {
      await Task.findByIdAndUpdate(taskId, {
        columnId: newColumn,
      }).then((result) => result);
      tasksWithoutCurrent = tasks;
    }

    const before = tasksWithoutCurrent.slice(0, order - 1);
    const after = tasksWithoutCurrent.slice(order - 1);

    const newOrderedTasks = [...before, currentTask, ...after];

    newOrderedTasks.forEach(({ _id }, index) =>
      Task.findByIdAndUpdate(_id, {
        order: index + 1,
      }).then((result) => console.log(result))
    );
  });
};

export const deleteTask = (req, res) => {
  Task.findByIdAndDelete(req.params.taskId).then((result) => {
    res.sendStatus(200);
  });
};
