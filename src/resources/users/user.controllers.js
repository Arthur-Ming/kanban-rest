import User from './user.model.js';
import { readFile } from 'node:fs/promises';
import { v4 as uuid } from 'uuid';

const users = JSON.parse(await readFile(new URL('../../data/users.json', import.meta.url)));

import passport from '../../libs/passport.js';

export const setTestUsers = async (ctx) => {
  await User.deleteMany();

  for (const user of users.users) {
    const u = new User(user);
    await u.setPassword(user.password);
    await u.save();
  }

  ctx.body = users;
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

    ctx.body = { token };
  })(ctx, next);
};
