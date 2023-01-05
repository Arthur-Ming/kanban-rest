import { KoaPassport } from 'koa-passport';
import localStrategy from './strategies/local.js';

const passport = new KoaPassport();

passport.use(localStrategy);

export default passport;
