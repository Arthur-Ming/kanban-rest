import { Strategy as LocalStrategy } from 'passport-local';
import User from '../../resources/users/user.model.js';
import { NotFoundError, AuthenticationError } from '../../errors/appErrors.js';

const ENTITY_NAME = 'user';

export default new LocalStrategy({ usernameField: 'email', session: false }, async function (
  email,
  password,
  done
) {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new NotFoundError(ENTITY_NAME, { email });
    }

    const isValidPassword = await user.checkPassword(password);

    if (!isValidPassword) {
      throw new AuthenticationError('Wrong password');
    }

    return done(null, user);
  } catch (err) {
    done(err);
  }
});
