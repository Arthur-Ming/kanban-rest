import Session from '../resources/session/session.model.js';
import { AuthorizationError, AuthenticationError } from '../errors/appErrors.js';

export const checkAuthentication = async (ctx, next) => {
  const header = ctx.request.get('Authorization');

  if (!header) return next();

  const token = header.split(' ')[1];
  if (!token) return next();

  const session = await Session.findOne({ token }).populate('user');

  if (!session) {
    throw new AuthorizationError();
  }

  ctx.user = session.user;
  return next();
};

export const mustBeAuthenticated = (ctx, next) => {
  if (!ctx.user) {
    throw new AuthenticationError();
  }

  return next();
};
