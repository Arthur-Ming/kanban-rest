import Session from './session.model.js';

export const upsert = async (user, token) => {
  return await Session.findOneAndUpdate({ user }, { token, user }, { upsert: true, new: true });
};
