import { getAll, create, get, remove, update } from './column.service.js';
import { StatusCodes } from 'http-status-codes';

export const getAllColumns = async (req, res) => {
  const { boardId } = req.params;

  const columns = await getAll(boardId);
  res.send(columns);
};

export const getColumnById = async (req, res) => {
  const { boardId, columnId } = req.params;

  const column = await get(boardId, columnId);
  res.send(column);
};

export const creatColumn = async (req, res) => {
  const body = req.body;
  const { boardId } = req.params;

  const column = await create(boardId, body);
  res.status(StatusCodes.OK).send(column);
};

export const deleteColumn = async (req, res) => {
  const { boardId, columnId } = req.params;

  await remove(boardId, columnId);
  res.sendStatus(StatusCodes.OK);
};

export const updateColumn = async (req, res) => {
  const { boardId, columnId } = req.params;
  const body = req.body;

  const todo = await update(boardId, columnId, body);
  res.status(StatusCodes.OK).send(todo);
};
