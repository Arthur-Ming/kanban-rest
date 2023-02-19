import Board from './board.model.js';
import Column from '../columns/column.model.js';
import Task from '../tasks/task.model.js';
import { NotFoundError, UnprocessableEntityError } from '../../errors/appErrors.js';

export const getAll = async () => {
  return await Board.find();
};

export const get = async (boardId) => {
  const board = await Board.findById(boardId).populate({
    path: 'columns',
    populate: {
      path: 'tasks',
      populate: {
        path: 'files',
      },
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

  return board;
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

export const updateOrder = async (boardId, body) => {
  const board = await Board.findOne({ _id: boardId }, { columns: 1 });

  if (!board) {
    throw new NotFoundError('board', { id: boardId });
  }

  const { source, destination, columnId } = body;

  if (!board.columns.includes(columnId)) {
    throw new NotFoundError(`column in board ${boardId}`, { id: columnId });
  }
  if (destination.index >= board.columns.length) {
    throw new UnprocessableEntityError(`"destination.index" must be less than "columns.length"`);
  }

  board.columns.splice(source.index, 1);
  board.columns.splice(destination.index, 0, columnId);

  board.save((err) => {
    if (err) throw new Error(err);
  });

  return board;
};
