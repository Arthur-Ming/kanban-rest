import Board from '../boards/board.model.js ';
import Column from '../columns/column.model.js';
import Task from './task.model.js';
import mongoose from 'mongoose';
import { NotFoundError } from '../../errors/appErrors.js';

export const getAll = async (boardId, columnId) => {
  const [board, column] = await Promise.all([Board.findById(boardId), Column.findById(columnId)]);

  if (!board) {
    throw new NotFoundError('board', { id: boardId });
  }

  if (!column) {
    throw new NotFoundError('column', { id: columnId });
  }
  return await Task.find({ boardId, columnId });
};

export const get = async (boardId, columnId, taskId) => {
  const [board, column, task] = await Promise.all([
    Board.findById(boardId),
    Column.findById(columnId),
    Task.findById(taskId),
  ]);

  if (!board) {
    throw new NotFoundError('board', { id: boardId });
  }

  if (!column) {
    throw new NotFoundError('column', { id: columnId });
  }

  if (!task) {
    throw new NotFoundError('task', { id: taskId });
  }

  return task;
};

export const create = async (boardId, columnId, taskBody) => {
  const [board, column] = await Promise.all([Board.findById(boardId), Column.findById(columnId)]);

  if (!board) {
    throw new NotFoundError('board', { id: boardId });
  }

  if (!column) {
    throw new NotFoundError('column', { id: columnId });
  }

  const task = await Task.create({
    boardId: mongoose.Types.ObjectId(boardId),
    columnId: mongoose.Types.ObjectId(columnId),
    ...taskBody,
  });

  await Column.findByIdAndUpdate(columnId, { $push: { tasks: task } });

  return task;
};

export const remove = async (boardId, columnId, taskId) => {
  const [board, column] = await Promise.all([Board.findById(boardId), Column.findById(columnId)]);

  if (!board) {
    throw new NotFoundError('board', { id: boardId });
  }

  if (!column) {
    throw new NotFoundError('column', { id: columnId });
  }
  await Column.findByIdAndUpdate(columnId, { $pull: { tasks: taskId } });
  await Task.findByIdAndDelete(taskId);
};

export const update = async (boardId, columnId, taskId, body) => {
  const [board, column] = await Promise.all([Board.findById(boardId), Column.findById(columnId)]);

  if (!board) {
    throw new NotFoundError('board', { id: boardId });
  }

  if (!column) {
    throw new NotFoundError('column', { id: columnId });
  }
  const task = await Task.findByIdAndUpdate(taskId, body, {
    returnDocument: 'after',
  });

  if (!task) {
    throw new NotFoundError('task', { id: taskId });
  }
  return task;
};
