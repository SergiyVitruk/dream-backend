import { Session } from '../models/session.js';
import { User } from '../models/user.js';

export const optionalAuthenticate = async (req, res, next) => {
  if (!req.cookies.accessToken) {
    return next();
  }

  const session = await Session.findOne({
    accessToken: req.cookies.accessToken,
  });

  if (!session) {
    return next();
  }

  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);

  if (isAccessTokenExpired) {
    return next();
  }

  const user = await User.findById(session.userId);

  if (!user) {
    return next();
  }

  req.user = user;

  next();
};
