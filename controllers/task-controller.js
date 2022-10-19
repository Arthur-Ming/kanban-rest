import Board from "../models/board.js";
import Column from "../models/column.js";
import Task from "../models/task.js";

export const getAllTasks = async (req, res) => {
  const { columnId } = req.params;
  const tasks = await Task.find({ columnId });
  res.send(tasks);
};

export const creatTask = async (req, res) => {
  const { boardId, columnId } = req.params;

  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });

  req.on("end", async () => {
    const { title, description = "" } = JSON.parse(data.toString());
    const tasks = await Task.find({ boardId, columnId });
    const order = tasks.length + 1;
    const task = new Task({ title, description, boardId, columnId, order });
    task
      .save()
      .then((result) => res.status(201).send(result))
      .catch((error) => {
        console.log(error);
      });
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
