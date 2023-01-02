import { getAll, create, get, remove, update } from './task.service.js';

export const getAllTasks = async (ctx) => {
  const { boardId, columnId } = ctx.params;
  ctx.body = await getAll(boardId, columnId);
};

export const getTaskById = async (ctx) => {
  const { boardId, columnId, taskId } = ctx.params;
  ctx.body = await get(boardId, columnId, taskId);
};

export const creatTask = async (ctx) => {
  const { boardId, columnId } = req.params;
  const body = ctx.request.body;

  ctx.body = await create(boardId, columnId, body);
};

export const deleteTask = async (ctx) => {
  const { boardId, columnId, taskId } = ctx.params;
  ctx.body = await remove(boardId, columnId, taskId);
};

export const updateTask = async (ctx) => {
  const { boardId, columnId, taskId } = ctx.params;
  const body = ctx.request.body;

  ctx.body = await update(boardId, columnId, taskId, body);
};
