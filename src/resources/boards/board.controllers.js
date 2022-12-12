import { getAll, get, create, remove, update } from './board.service.js';
import { StatusCodes } from 'http-status-codes';

export const getAllBoards = async (req, res, next) => {
  try {
    const boards = await getAll();
    res.send(boards);
  } catch (error) {
    return next(error);
  }
};

export const getBoardById = async (req, res, next) => {
  const { boardId } = req.params;

  try {
    const board = await get(boardId);
    res.send(board);
  } catch (error) {
    return next(error);
  }
};

export const creatBoard = async (req, res, next) => {
  const body = req.body;

  try {
    const board = await create(body);
    res.status(StatusCodes.OK).send(board);
  } catch (err) {
    return next(err);
  }
};

export const deleteBoard = async (req, res, next) => {
  const { boardId } = req.params;

  try {
    await remove(boardId);
    res.sendStatus(StatusCodes.OK);
  } catch (err) {
    return next(err);
  }
};

export const updateBoard = async (req, res, next) => {
  const { boardId } = req.params;
  const body = req.body;

  try {
    const todo = await update(boardId, body);
    res.status(StatusCodes.OK).send(todo);
  } catch (err) {
    return next(err);
  }
};
