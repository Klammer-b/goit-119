import { Joi, Segments } from 'celebrate';
import { GENDERS } from '../constants/genders.js';

export const createStudentValidationSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().required().min(2).max(30),
    age: Joi.number().required().min(6).max(18),
    avgMark: Joi.number().required().min(2).max(12),
    gender: Joi.string()
      .required()
      .valid(...Object.values(GENDERS)),
    onDuty: Joi.boolean(),
  }),
};

// name: { type: String, required: true },
//   age: { type: Number, required: true },
//   avgMark: { type: Number, required: true },
//   gender: { type: String, required: true, enum: ['male', 'female', 'other'] },
//   onDuty: { type: Boolean, default: false },
