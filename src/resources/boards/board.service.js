import Board from './board.model.js';
import Column from '../columns/column.model.js';
import Task from '../tasks/task.model.js';
import { NotFoundError } from '../../errors/appErrors.js';

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
  const [board] = await Promise.all([
    Board.findByIdAndDelete(boardId),
    Column.deleteMany({ boardId }),
    Task.deleteMany({ boardId }),
  ]);

  if (!board) {
    throw new NotFoundError('board', { id: boardId });
  }
};

export const update = async (boardId, body) => {
  const board = await Board.findByIdAndUpdate(boardId, body, {
    new: true,
  });
  if (!board) {
    throw new NotFoundError('board', { id: boardId });
  }
  return board;
};
