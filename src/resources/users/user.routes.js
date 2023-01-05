import Router from 'koa-router';
import { setTestUsers } from './user.controllers.js';

const usersRouter = Router();

usersRouter.get('/users/test', setTestUsers);

export default usersRouter;
