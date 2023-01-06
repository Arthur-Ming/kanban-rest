import User from './user.model.js';
import { v4 as uuid } from 'uuid';
import Session from '../session/session.model.js';
import passport from '../../libs/passport.js';
import { save } from './user.service.js';

export const register = async (ctx) => {
  const body = ctx.request.body;

  const u = await save(body);
  await u.setPassword(body.password);
  const { name, _id: id } = await u.save();
  ctx.body = { name, id };
};

export const login = async (ctx, next) => {
  await passport.authenticate('local', async (err, user, info) => {
    if (err) throw err;

    if (!user) {
      ctx.status = 400;
      ctx.body = { error: info };
      return;
    }

    const token = uuid();
    await Session.findOneAndUpdate({ user }, { token, user }, { upsert: true, new: true });

    ctx.body = { token, name: user.displayName, id: user._id };
  })(ctx, next);
};

export const getAllUsers = async (ctx) => {
  ctx.body = 'users';
};

export const getUserById = async (ctx) => {
  ctx.body = 'users';
};
