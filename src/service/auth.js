import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import crypto from 'node:crypto';
import { User } from '../db/models/user.js';
import { Session } from '../db/models/session.js';

const createSession = (userId) => ({
  userId,
  refreshToken: crypto.randomBytes(30).toString('base64'),
  accessToken: crypto.randomBytes(30).toString('base64'),
  accessTokenValidUntil: new Date(Date.now() + 1000 * 60 * 15), // 15 minutes
  refreshTokenValidUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
});

export const registerUser = async (payload) => {
  const foundUser = await User.findOne({ email: payload.email });

  if (foundUser) {
    throw createHttpError(409, 'User with this email already exists');
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const user = await User.create({ ...payload, password: hashedPassword });

  return user;
};

export const loginUser = async (payload) => {
  const foundUser = await User.findOne({ email: payload.email });

  if (!foundUser) {
    throw createHttpError(400, 'Credentials are invalid');
  }

  const arePasswordsEqual = await bcrypt.compare(
    payload.password,
    foundUser.password,
  );

  if (!arePasswordsEqual) {
    throw createHttpError(400, 'Credentials are invalid');
  }

  await Session.findOneAndDelete({ userId: foundUser._id });

  const session = await Session.create(createSession(foundUser._id));

  return session;
};

export const refreshSession = async (sessionId, refreshToken) => {
  try {
    const session = await Session.findOne({ _id: sessionId, refreshToken });

    if (!session) {
      throw createHttpError(401, 'Session not found!');
    }

    if (session.refreshTokenValidUntil < new Date()) {
      throw createHttpError(401, 'Session expired!');
    }

    const user = await User.findById(session.userId);

    if (!user) {
      throw createHttpError(401, 'Session not found!');
    }

    await Session.findOneAndDelete({ _id: sessionId, refreshToken });

    const newSession = await Session.create(createSession(user._id));

    return newSession;
  } catch (err) {
    await Session.findOneAndDelete({ _id: sessionId, refreshToken });

    throw err;
  }
};

export const logoutUser = async (sessionId, refreshToken) => {
  await Session.findOneAndDelete({ _id: sessionId, refreshToken });
};
