import User from './user.model.js';

export const getAll = async () => {
  return await User.find();
};

export const get = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError('user', { id: userId });
  }
  return user;
};
