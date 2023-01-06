import User from './user.model.js';
import { EntityExistsError } from '../../errors/appErrors.js';

const ENTITY_NAME = 'user';
const MONGO_ENTITY_EXISTS_ERROR_CODE = 11000;

export const save = async (user) => {
  try {
    return await User.create(user);
  } catch (err) {
    if (err.code === MONGO_ENTITY_EXISTS_ERROR_CODE) {
      throw new EntityExistsError(`${ENTITY_NAME} with this e-mail exists`);
    } else {
      throw err;
    }
  }
};
