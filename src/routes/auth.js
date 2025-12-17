import { Router } from 'express';
import {
  loginUserController,
  logoutController,
  refreshSessionController,
  registerUserController,
  requestResetPasswordEmailController,
  resetPasswordController,
} from '../controllers/auth.js';
import { registerUserValidationSchema } from '../validation/registerUserValidationSchema.js';
import { celebrate } from 'celebrate';
import { loginUserValidationSchema } from '../validation/loginUserValidationSchema.js';
import { requestResetPasswordValidationSchema } from '../validation/requestResetPasswordEmailValidationSchema.js';
import { resetPasswordValidationSchema } from '../validation/resetPasswordValidationSchema.js';

const authRouter = Router();

authRouter.post(
  '/auth/register',
  celebrate(registerUserValidationSchema),
  registerUserController,
);
authRouter.post(
  '/auth/login',
  celebrate(loginUserValidationSchema),
  loginUserController,
);
authRouter.post('/auth/logout', logoutController);
authRouter.post('/auth/refresh-session', refreshSessionController);

authRouter.post(
  '/auth/request-reset-password-email',
  celebrate(requestResetPasswordValidationSchema),
  requestResetPasswordEmailController,
);
authRouter.post(
  '/auth/reset-password',
  celebrate(resetPasswordValidationSchema),
  resetPasswordController,
);

export default authRouter;
