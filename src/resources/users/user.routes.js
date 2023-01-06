import Router from 'koa-router';
import { login, getAllUsers, register, getUserById } from './user.controllers.js';
import { checkAuthentication, mustBeAuthenticated } from '../../utils/authentication.js';

const usersRouter = new Router();

usersRouter.use(checkAuthentication);

usersRouter
  .get('/users', mustBeAuthenticated, getAllUsers)
  .get('users/:userId', mustBeAuthenticated, getUserById)
  .post('/users/login', login)
  .post('/users/register', register);

export default usersRouter;
