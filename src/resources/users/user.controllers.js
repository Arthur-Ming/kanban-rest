import { v4 as uuid } from 'uuid';
import passport from '../../libs/passport.js';
import { save, getAll, get } from './user.service.js';
import { upsert } from '../session/session.service.js';

export const addUser = async (ctx) => {
  const body = ctx.request.body;
  const { name, _id: id } = await save(body);
  ctx.body = { name, id };
};

export const signIn = async (ctx, next) => {
  await passport.authenticate('local', async (err, user, info) => {
    if (err) throw err;

    if (!user) {
      ctx.status = 400;
      ctx.body = { error: info };
      return;
    }

    const token = uuid();

    await upsert(user, token);

    ctx.body = { token, name: user.name, id: user._id };
  })(ctx, next);
};

export const getAllUsers = async (ctx) => {
  ctx.body = await getAll();
};

export const getUserById = async (ctx) => {
  const { userId } = ctx.params;
  ctx.body = await get(userId);
};
