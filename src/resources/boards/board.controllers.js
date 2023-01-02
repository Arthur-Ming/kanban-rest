import { getAll, get, create, remove, update } from './board.service.js';

export const getAllBoards = async (ctx) => {
  ctx.body = await getAll();
};

export const getBoardById = async (ctx) => {
  const { boardId } = ctx.params;
  ctx.body = await get(boardId);
};

export const creatBoard = async (ctx) => {
  const body = ctx.request.body;
  ctx.body = await create(body);
};

export const deleteBoard = async (ctx) => {
  const { boardId } = ctx.params;
  ctx.body = await remove(boardId);
};

export const updateBoard = async (ctx) => {
  const { boardId } = ctx.params;
  const body = ctx.request.body;

  ctx.body = await update(boardId, body);
};
