import { Router } from 'express';
import {
  loginUserController,
  logoutController,
  registerUserController,
} from '../controllers/auth.js';
import { registerUserValidationSchema } from '../validation/registerUserValidationSchema.js';
import { celebrate } from 'celebrate';
import { loginUserValidationSchema } from '../validation/loginUserValidationSchema.js';

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

export default authRouter;
