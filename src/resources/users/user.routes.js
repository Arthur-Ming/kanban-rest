import Router from 'koa-router';
import { setTestUsers, login } from './user.controllers.js';

const usersRouter = Router();

usersRouter.get('/users/test', setTestUsers).post('/users/login', login);

export default usersRouter;
