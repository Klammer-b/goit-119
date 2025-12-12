import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

export const validateObjectId = (value, helpers) => {
  const isValid = isValidObjectId(value);

  if (!isValid) {
    return helpers.error('studentId.invalid');
  }
  return value;
};

export const studentIdValidationSchema = {
  [Segments.PARAMS]: Joi.object({
    studentId: Joi.string().required().custom(validateObjectId).messages({
      'studentId.invalid': '"{#value}" must be a valid mongo id!',
    }),
  }),
};
