import Board from './board.model.js';
import Column from '../columns/column.model.js';
import Task from '../tasks/task.model.js';
import { NotFoundError } from '../../errors/appErrors.js';

export const hasBoardById = async (boardId) => {
  const board = await Board.findById(boardId);

  if (!board) {
    throw new NotFoundError('board', { id: boardId });
  }
};

export const getAll = async () => {
  return await Board.find();
};

export const get = async (boardId) => {
  const board = await Board.findById(boardId).populate({
    path: 'columns',
    populate: {
      path: 'tasks',
    },
  });

  if (!board) {
    throw new NotFoundError('board', { id: boardId });
  }
  return board;
};

export const create = async (board) => {
  return await Board.create(board);
};

export const remove = async (boardId) => {
  await Board.findByIdAndDelete(boardId);
  await Column.deleteMany({ boardId });
  await Task.deleteMany({ boardId });
};

export const update = async (boardId, body) => {
  const board = await Board.findByIdAndUpdate(boardId, body, {
    returnDocument: 'after',
  });
  if (!board) {
    throw new NotFoundError('board', { id: boardId });
  }
  return board;
};
