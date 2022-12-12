import { getAll, create, get, remove, update } from './column.service.js';
import { StatusCodes } from 'http-status-codes';

export const getAllColumns = async (req, res, next) => {
  const { boardId } = req.params;
  try {
    const columns = await getAll(boardId);
    res.send(columns);
  } catch (error) {
    return next(error);
  }
};

export const getColumnById = async (req, res, next) => {
  const { boardId, columnId } = req.params;

  try {
    const column = await get(boardId, columnId);
    res.send(column);
  } catch (error) {
    return next(error);
  }
};

export const creatColumn = async (req, res, next) => {
  const body = req.body;
  const { boardId } = req.params;
  try {
    const column = await create(boardId, body);
    res.status(StatusCodes.OK).send(column);
  } catch (err) {
    return next(err);
  }
};

export const deleteColumn = async (req, res, next) => {
  const { boardId, columnId } = req.params;

  try {
    await remove(boardId, columnId);
    res.sendStatus(StatusCodes.OK);
  } catch (err) {
    return next(err);
  }
};

export const updateColumn = async (req, res, next) => {
  const { boardId, columnId } = req.params;
  const body = req.body;

  try {
    const todo = await update(boardId, columnId, body);
    res.status(StatusCodes.OK).send(todo);
  } catch (err) {
    return next(err);
  }
};
