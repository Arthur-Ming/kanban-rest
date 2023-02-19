import { getAll, create, get, remove, update, updateOrder } from './column.service.js';

export const getAllColumns = async (ctx) => {
  const { boardId } = ctx.params;
  ctx.body = await getAll(boardId);
};

export const getColumnById = async (ctx) => {
  const { boardId, columnId } = ctx.params;
  ctx.body = await get(boardId, columnId);
};

export const creatColumn = async (ctx) => {
  const body = ctx.request.body;
  const { boardId } = ctx.params;
  ctx.body = await create(boardId, body);
};

export const deleteColumn = async (ctx) => {
  const { boardId, columnId } = ctx.params;
  ctx.body = await remove(boardId, columnId);
};

export const updateColumn = async (ctx) => {
  const { boardId, columnId } = ctx.params;
  const body = ctx.request.body;

  ctx.body = await update(boardId, columnId, body);
};

export const updateTasksOrder = async (ctx) => {
  const { boardId, columnId } = ctx.params;
  const body = ctx.request.body;

  ctx.body = await updateOrder(boardId, columnId, body);
};
