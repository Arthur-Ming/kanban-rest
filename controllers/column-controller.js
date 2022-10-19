import Column from "../models/column.js";
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
  const column = await Column.findOne({ boardId, columnId });
  const tasks = await Column.find({ boardId, columnId });
  const { _id, title } = column;
  res.send({
    _id,
    title,
    tasks,
  });
};

export const creatColumn = (req, res) => {
  const boardId = req.params.boardId;
  Column.findById(boardId)
    .then(() => {
      let data = "";
      req.on("data", (chunk) => {
        data += chunk;
      });
      req.on("end", async () => {
        const { title } = JSON.parse(data.toString());
        const columns = await Column.find({ boardId });
        const order = columns.length + 1;
        const column = new Column({ title, boardId, board: boardId, order });
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
