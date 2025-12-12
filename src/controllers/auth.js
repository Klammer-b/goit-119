import { clearSession, setupSession } from '../helper/authHelpers.js';
import {
  loginUser,
  logoutUser,
  refreshSession,
  registerUser,
} from '../service/auth.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.json({
    status: 200,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  setupSession(session, res);

  res.json({
    status: 200,
    message: 'Successfully logged in a user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const refreshSessionController = async (req, res) => {
  try {
    const session = await refreshSession(
      req.cookies.sessionId,
      req.cookies.refreshToken,
    );

    setupSession(session, res);

    res.json({
      status: 200,
      message: 'Successfully refreshed a session!',
      data: {
        accessToken: session.accessToken,
      },
    });
  } catch (error) {
    clearSession(res);

    throw error;
  }
};

export const logoutController = async (req, res) => {
  await logoutUser(req.cookies.sessionId, req.cookies.refreshToken);

  clearSession(res);

  res.status(204).send();
};
