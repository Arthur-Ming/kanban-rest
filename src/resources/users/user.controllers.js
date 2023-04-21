import { getAll, get } from './user.service.js';

export const getAllUsers = async (ctx) => {
  ctx.body = await getAll();
};

export const getUserById = async (ctx) => {
  const { userId } = ctx.params;
  ctx.body = await get(userId);
};
