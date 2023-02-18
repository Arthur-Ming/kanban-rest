import Column from './column.model.js';
import Board from '../boards/board.model.js ';
import Task from '../tasks/task.model.js';
import mongoose from 'mongoose';
import { NotFoundError } from '../../errors/appErrors.js';

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

export const getTaskIds = async (boardId, columnId) => {
  const column = await Column.findOne({ _id: columnId, boardId }, { tasks: 1 });

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

  const tasksSource = [...columnSource.tasks];

  if (columnId === destination.columnId) {
    columnSource.tasks.splice(source.index, 1);
    columnSource.tasks.splice(destination.index, 0, taskId);

    columnSource.save((err) => {
      if (err) throw new Error(err);
    });

    return {
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
    const tasksDestination = [...columnDestination.tasks];
    const tasksSource = [...columnSource.tasks];

    columnSource.tasks.splice(source.index, 1);
    columnDestination.tasks.splice(destination.index, 0, taskId);

    columnSource.save((err) => {
      if (err) throw new Error(err);
    });
    columnDestination.save((err) => {
      if (err) throw new Error(err);
    });

    return {
      source: {
        id: columnId,
        tasks: tasksSource,
      },
      destination: columnDestination,
    };
  }
};
