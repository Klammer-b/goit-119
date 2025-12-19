import { Joi, Segments } from 'celebrate';

export const resetPasswordValidationSchema = {
  [Segments.BODY]: Joi.object({
    token: Joi.string().required(),
    password: Joi.string()
      .required()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{12,}$/),
  }),
};
