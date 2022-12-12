import Column from './column.model.js';
import Board from '../boards/board.model.js ';
import Task from '../tasks/task.model.js';
import { hasBoardById } from '../boards/board.service.js';
import mongoose from 'mongoose';
import { NotFoundError } from '../../errors/appErrors.js';

export const getAll = async (boardId) => {
  await hasBoardById(boardId);
  return await Column.find({ boardId });
};

export const get = async (boardId, columnId) => {
  await hasBoardById(boardId);

  const column = await Column.findById(columnId).populate({
    path: 'tasks',
  });

  if (!column) {
    throw new NotFoundError('column', { id: columnId });
  }
  return column;
};

export const create = async (boardId, columnBody) => {
  await hasBoardById(boardId);

  const column = await Column.create({
    boardId: mongoose.Types.ObjectId(boardId),
    ...columnBody,
  });

  await Board.findByIdAndUpdate(boardId, { $push: { columns: column } });

  return column;
};

export const remove = async (boardId, columnId) => {
  await hasBoardById(boardId);

  await Board.findByIdAndUpdate(boardId, { $pull: { columns: columnId } });

  await Column.findByIdAndDelete(columnId);
  await Task.deleteMany({ columnId });
};

export const update = async (boardId, columnId, body) => {
  await hasBoardById(boardId);

  const column = await Column.findByIdAndUpdate(columnId, body, {
    returnDocument: 'after',
  });

  if (!column) {
    throw new NotFoundError('column', { id: columnId });
  }
  return column;
};
