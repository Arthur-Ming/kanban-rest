const Column = require("../models/column");
const Board = require("../models/board");
const Task = require("../models/task");
const createPath = require("../helpers/create-path");

const getAllColumns = async (req, res) => {
  const { boardId } = req.params;
  const columns = await Column.find({ boardId });
  res.send(columns);
};

const getColumnById = async (req, res) => {
  const { boardId, columnId } = req.params;
  const column = await Column.findOne({ boardId, columnId });
  const tasks = await Task.find({ boardId, columnId });
  const { _id, title } = column;
  res.send({
    _id,
    title,
    tasks,
  });
};

const creatColumn = (req, res) => {
  const boardId = req.params.boardId;
  Board.findById(boardId)
    .then(() => {
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on("end", async () => {
        const { title } = JSON.parse(data.toString());
        const columns = await Column.find({ boardId });
        const order = columns.length + 1;
        const column = new Column({ title, boardId, order });
        column
          .save()
          .then((result) => res.status(201).send(result))
          .catch((error) => {
            console.log(error);
          });
      });
    })
    .catch((error) => {
      console.log(error);
      res.render(createPath("error"), { title: "Error" });
    });
};

const updateColumn = (req, res) => {
  const { boardId, columnId } = req.params;

  let data = "";
  req.on("data", (chunk) => {
    data += chunk;
  });
  req.on("end", async () => {
    const { order } = await JSON.parse(data.toString());

    // console.log(order);
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
  });
};

const deleteColumn = (req, res) => {
   Column.findByIdAndDelete(req.params.columnId).then((result) => {
    res.sendStatus(200);
  });
};

module.exports = {
  getAllColumns,
  creatColumn,
  getColumnById,
  updateColumn,
  deleteColumn
};
