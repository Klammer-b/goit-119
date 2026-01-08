import { Joi, Segments } from 'celebrate';

export const requestResetPasswordValidationSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().required().email(),
  }),
};
