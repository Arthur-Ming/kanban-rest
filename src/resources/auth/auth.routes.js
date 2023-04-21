import Router from 'koa-router';
import { signIn, addUser, signOut } from './auth.controllers.js';
import validator from '../../utils/validation/validator.js';
import schemas from '../../utils/validation/schemas.js';

const { register, login } = schemas;

const authRouter = new Router();

authRouter
  .post('/login', validator(login, 'body'), signIn)
  .post('/logout', signOut)
  .post('/register', validator(register, 'body'), addUser);

export default authRouter;
