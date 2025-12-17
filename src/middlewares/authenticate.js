import createHttpError from 'http-errors';
import { Session } from '../db/models/session.js';
import { User } from '../db/models/user.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw createHttpError(401, 'No auth token provided!');
  }

  const [bearer, accessToken] = authHeader.split(' ');

  if (bearer !== 'Bearer' || !accessToken) {
    throw createHttpError(401, 'Token must be of type Bearer!');
  }

  const session = await Session.findOne({ accessToken });

  if (!session) {
    throw createHttpError(401, 'No session associated with this token found!');
  }

  if (session.accessTokenValidUntil < new Date()) {
    throw createHttpError(401, 'Access token expired!');
  }

  const user = await User.findById(session.userId);

  if (!user) {
    throw createHttpError(401, 'No session associated with this token found!');
  }

  req.user = user;

  next();
};
