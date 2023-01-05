import Router from 'koa-router';
import { setTestUsers, login, getAllUsers } from './user.controllers.js';
import Session from '../session/session.model.js';

const usersRouter = new Router();

usersRouter.use(async (ctx, next) => {
  const header = ctx.request.get('Authorization');

  if (!header) return next();

  const token = header.split(' ')[1];
  if (!token) return next();
  console.log('token');
  console.log(token);

  const session = await Session.findOne({ token }).populate('user');
  if (!session) {
    ctx.throw(401, 'Неверный аутентификационный токен');
  }
  session.lastVisit = new Date();
  await session.save();

  ctx.user = session.user;
  return next();
});

function mustBeAuthenticated(ctx, next) {
  if (!ctx.user) {
    ctx.throw(401, 'Пользователь не залогинен');
  }

  return next();
}

usersRouter
  .get('/users/test', setTestUsers)
  .get('/users', mustBeAuthenticated, getAllUsers)
  .post('/users/login', login);

export default usersRouter;
