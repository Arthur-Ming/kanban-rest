import User from '../users/user.model.js';
import Session from '../session/session.model.js';
import { EntityExistsError } from '../../errors/appErrors.js';

const ENTITY_NAME = 'user';
const MONGO_ENTITY_EXISTS_ERROR_CODE = 11000;

export const save = async (user) => {
  try {
    const u = await User.create(user);
    await u.setPassword(user.password);
    return await u.save();
  } catch (err) {
    if (err.code === MONGO_ENTITY_EXISTS_ERROR_CODE) {
      throw new EntityExistsError(`${ENTITY_NAME} with this e-mail exists`);
    } else {
      throw err;
    }
  }
};
