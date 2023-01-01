import { getAll, get, create, remove, update } from './board.service.js';
import { StatusCodes } from 'http-status-codes';

export const getAllBoards = async (req, res) => {
  const boards = await getAll();
  res.send(boards);
};

export const getBoardById = async (req, res) => {
  const { boardId } = req.params;

  const board = await get(boardId);
  res.send(board);
};

export const creatBoard = async (req, res) => {
  const body = req.body;

  const board = await create(body);
  res.status(StatusCodes.OK).send(board);
};

export const deleteBoard = async (req, res) => {
  const { boardId } = req.params;

  await remove(boardId);
  res.sendStatus(StatusCodes.OK);
};

export const updateBoard = async (req, res) => {
  const { boardId } = req.params;
  const body = req.body;

  const todo = await update(boardId, body);
  res.status(StatusCodes.OK).send(todo);
};
