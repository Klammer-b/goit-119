import { Joi, Segments } from 'celebrate';
import { GENDERS } from '../constants/genders.js';
import { studentIdValidationSchema } from './studentIdValidationSchema.js';

export const updateStudentValidationSchema = {
  ...studentIdValidationSchema,
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(30),
    age: Joi.number().min(6).max(18),
    avgMark: Joi.number().min(2).max(12),
    gender: Joi.string().valid(...Object.values(GENDERS)),
    onDuty: Joi.boolean(),
  }).min(1),
};
