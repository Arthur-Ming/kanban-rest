import Board from '../boards/board.model.js ';
import Column from '../columns/column.model.js';
import Task from './task.model.js';
import mongoose from 'mongoose';
import { NotFoundError } from '../../errors/appErrors.js';

export const getAll = async (boardId, columnId) => {
  return await Task.find({ boardId, columnId });
};

export const get = async (boardId, columnId, taskId) => {
  const task = await Task.findOne({ _id: taskId, boardId, columnId });

  if (!task) {
    throw new NotFoundError('task', { id: taskId, boardId, columnId });
  }

  return task;
};

export const create = async (boardId, columnId, taskBody) => {
  const column = await Column.findOne({ _id: columnId, boardId });

  if (!column) {
    throw new NotFoundError('column', { id: columnId, boardId });
  }

  const task = await Task.create({
    boardId: mongoose.Types.ObjectId(boardId),
    columnId: mongoose.Types.ObjectId(columnId),
    ...taskBody,
  });

  await column.updateOne({ $push: { tasks: task } });

  return task;
};

export const remove = async (boardId, columnId, taskId) => {
  const [column, task] = await Promise.all([
    Column.findOneAndUpdate({ _id: columnId, boardId }, { $pull: { tasks: taskId } }),
    Task.findOneAndDelete({ _id: taskId, boardId, columnId }),
  ]);

  if (!column) {
    throw new NotFoundError('column', { id: columnId, boardId });
  }

  if (!task) {
    throw new NotFoundError('task', { id: taskId, boardId, columnId });
  }

  return task;
};

export const update = async (boardId, columnId, taskId, body) => {
  const task = await Task.findOneAndUpdate({ _id: taskId, boardId, columnId }, body, {
    new: true,
  });

  if (!task) {
    throw new NotFoundError('task', { id: taskId, columnId, boardId });
  }
  return task;
};
