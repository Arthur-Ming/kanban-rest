import Column from './column.model.js';
import Board from '../boards/board.model.js ';
import Task from '../tasks/task.model.js';
import mongoose from 'mongoose';
import { NotFoundError, UnprocessableEntityError } from '../../errors/appErrors.js';

export const getAll = async (boardId) => {
  return await Column.find({ boardId });
};

export const get = async (boardId, columnId) => {
  const column = await Column.findOne({ _id: columnId, boardId }).populate({
    path: 'tasks',
  });

  if (!column) {
    throw new NotFoundError('column', { id: columnId, boardId });
  }
  return column;
};

export const create = async (boardId, columnBody) => {
  const board = await Board.findById(boardId);

  if (!board) {
    throw new NotFoundError('board ', { id: boardId });
  }

  const column = await Column.create({
    boardId: mongoose.Types.ObjectId(boardId),
    ...columnBody,
  });

  await board.updateOne({ $push: { columns: column } });

  return column;
};

export const remove = async (boardId, columnId) => {
  const [board, column] = await Promise.all([
    Board.findByIdAndUpdate(boardId, { $pull: { columns: columnId } }),
    Column.findOneAndDelete({ _id: columnId, boardId }),
    Task.deleteMany({ boardId, columnId }),
  ]);

  if (!board) {
    throw new NotFoundError('board ', { id: boardId });
  }

  if (!column) {
    throw new NotFoundError('column ', { id: columnId, columnId });
  }

  return column;
};

export const update = async (boardId, columnId, body) => {
  const column = await Column.findOneAndUpdate({ _id: columnId, boardId }, body, {
    new: true,
  });

  if (!column) {
    throw new NotFoundError('column', { id: columnId, boardId });
  }
  return column;
};

export const updateOrder = async (boardId, columnId, body) => {
  const columnSource = await Column.findOne({ _id: columnId, boardId }, { tasks: 1 });

  if (!columnSource) {
    throw new NotFoundError('column', { id: columnId, boardId });
  }

  const { source, destination, taskId } = body;

  if (!columnSource.tasks.includes(taskId)) {
    throw new NotFoundError(`task in column ${columnId}`, { id: taskId });
  }

  const tasksSource = [...columnSource.tasks];

  if (columnId === destination.columnId) {
    if (destination.index >= columnSource.tasks.length) {
      throw new UnprocessableEntityError(`"destination.index" must be less than "tasks.length"`);
    }

    columnSource.tasks.splice(source.index, 1);
    columnSource.tasks.splice(destination.index, 0, taskId);

    columnSource.save((err) => {
      if (err) throw new Error(err);
    });

    return {
      taskId,
      source: {
        id: columnId,
        tasks: tasksSource,
      },
      destination: columnSource,
    };
  }
  if (columnId !== destination.columnId) {
    const columnDestination = await Column.findOne(
      { _id: destination.columnId, boardId },
      { tasks: 1 }
    );
    if (!columnDestination) {
      throw new NotFoundError('column', { id: destination.columnId, boardId });
    }

    if (destination.index > columnDestination.tasks.length) {
      throw new UnprocessableEntityError(`"destination.index" must be less than "tasks.length"`);
    }

    const tasksSource = [...columnSource.tasks];

    columnSource.tasks.splice(source.index, 1);
    columnDestination.tasks.splice(destination.index, 0, taskId);

    await Task.findByIdAndUpdate(taskId, { $set: { columnId: destination.columnId } });

    columnSource.save((err) => {
      if (err) throw new Error(err);
    });
    columnDestination.save((err) => {
      if (err) throw new Error(err);
    });

    return {
      taskId,
      source: {
        id: columnId,
        tasks: tasksSource,
      },
      destination: columnDestination,
    };
  }
};
