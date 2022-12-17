import { getAll, create, get, remove, update } from './task.service.js';
import { StatusCodes } from 'http-status-codes';

export const getAllTasks = async (req, res, next) => {
  const { boardId, columnId } = req.params;

  try {
    const tasks = await getAll(boardId, columnId);
    res.send(tasks);
  } catch (error) {
    return next(error);
  }
};

export const getTaskById = async (req, res, next) => {
  const { boardId, columnId, taskId } = req.params;

  try {
    const task = await get(boardId, columnId, taskId);
    res.send(task);
  } catch (error) {
    return next(error);
  }
};

export const creatTask = async (req, res, next) => {
  const body = req.body;
  const { boardId, columnId } = req.params;
  try {
    const board = await create(boardId, columnId, body);
    res.status(StatusCodes.OK).send(board);
  } catch (err) {
    return next(err);
  }
};

export const deleteTask = async (req, res, next) => {
  const { boardId, columnId, taskId } = req.params;

  try {
    await remove(boardId, columnId, taskId);
    res.sendStatus(StatusCodes.OK);
  } catch (err) {
    return next(err);
  }
};

export const updateTask = async (req, res, next) => {
  const { boardId, columnId, taskId } = req.params;
  const body = req.body;

  try {
    const task = await update(boardId, columnId, taskId, body);
    res.status(StatusCodes.OK).send(task);
  } catch (err) {
    return next(err);
  }
};
