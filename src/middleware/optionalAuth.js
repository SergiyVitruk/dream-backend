import { Session } from '../models/session.js';
import { User } from '../models/user.js';

export const optionalAuth = async (req, res, next) => {
  try {
    const { sessionId, accessToken } = req.cookies || {};

    if (!sessionId || !accessToken) {
      return next();
    }

    const session = await Session.findOne({
      _id: sessionId,
      accessToken,
    });

    if (!session || new Date() > new Date(session.accessTokenValidUntil)) {
      return next();
    }

    const user = await User.findById(session.userId);
    if (!user) {
      return next();
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
