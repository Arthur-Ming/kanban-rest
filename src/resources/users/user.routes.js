import Router from 'koa-router';
import { getAllUsers, getUserById } from './user.controllers.js';
import { checkAuthentication, mustBeAuthenticated } from '../../utils/authentication.js';

const usersRouter = new Router({ prefix: '/users' });
usersRouter.use(checkAuthentication, mustBeAuthenticated);

usersRouter.get('/', getAllUsers).get('/:userId', getUserById);

export default usersRouter;
