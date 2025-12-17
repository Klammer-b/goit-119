import { Joi, Segments } from 'celebrate';

export const registerUserValidationSchema = {
  [Segments.BODY]: Joi.object({
    username: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string()
      .required()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{12,}$/),
  }),
};
