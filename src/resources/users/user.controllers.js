import User from './user.model.js';
import { readFile } from 'node:fs/promises';
const users = JSON.parse(await readFile(new URL('../../data/users.json', import.meta.url)));

export const setTestUsers = async (ctx) => {
  await User.deleteMany();

  for (const user of users.users) {
    const u = new User(user);
    await u.setPassword(user.password);
    await u.save();
  }

  ctx.body = users;
};
