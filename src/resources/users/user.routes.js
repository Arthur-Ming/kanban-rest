import Router from 'koa-router';
import { signIn, getAllUsers, addUser, getUserById } from './user.controllers.js';
import { checkAuthentication, mustBeAuthenticated } from '../../utils/authentication.js';
import validator from '../../utils/validation/validator.js';
import schemas from '../../utils/validation/schemas.js';

const { register, login } = schemas;

const usersRouter = new Router({ prefix: '/users' });

/* usersRouter.use(checkAuthentication); */

usersRouter
  .get('/', /* mustBeAuthenticated */ getAllUsers)
  .get('/:userId', /*  mustBeAuthenticated, */ getUserById)
  .post('/login', validator(login, 'body'), signIn)
  .post('/register', validator(register, 'body'), addUser);

export default usersRouter;
