import { getAll, create, get, remove, update } from './task.service.js';
import { StatusCodes } from 'http-status-codes';

export const getAllTasks = async (req, res) => {
  const { boardId, columnId } = req.params;

  const tasks = await getAll(boardId, columnId);
  res.send(tasks);
};

export const getTaskById = async (req, res) => {
  const { boardId, columnId, taskId } = req.params;

  const task = await get(boardId, columnId, taskId);
  res.send(task);
};

export const creatTask = async (req, res) => {
  const body = req.body;
  const { boardId, columnId } = req.params;

  const board = await create(boardId, columnId, body);
  res.status(StatusCodes.OK).send(board);
};

export const deleteTask = async (req, res) => {
  const { boardId, columnId, taskId } = req.params;

  await remove(boardId, columnId, taskId);
  res.sendStatus(StatusCodes.OK);
};

export const updateTask = async (req, res) => {
  const { boardId, columnId, taskId } = req.params;
  const body = req.body;

  const task = await update(boardId, columnId, taskId, body);
  res.status(StatusCodes.OK).send(task);
};
