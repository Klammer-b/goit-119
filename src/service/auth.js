import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import crypto from 'node:crypto';
import { User } from '../db/models/user.js';
import { Session } from '../db/models/session.js';

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

  const session = await Session.create({
    userId: foundUser._id,
    refreshToken: crypto.randomBytes(30).toString('base64'),
    accessToken: crypto.randomBytes(30).toString('base64'),
    accessTokenValidUntil: new Date(Date.now() + 1000 * 60 * 15),
    refreshTokenValidUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  });

  return session;
};

export const logoutUser = async (sessionId, refreshToken) => {
  await Session.findOneAndDelete({ _id: sessionId, refreshToken });
};
