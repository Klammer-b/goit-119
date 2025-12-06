import { Joi, Segments } from 'celebrate';
import { GENDERS } from '../constants/genders.js';

export const getStudentsValidationSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(1).max(100).default(10),
    sortBy: Joi.string()
      .trim()
      .valid('id', 'name', 'age', 'avgMark')
      .default('_id'),
    sortOrder: Joi.string().trim().valid('asc', 'desc').default('desc'),
    minAge: Joi.number().integer().min(6).max(18),
    maxAge: Joi.number().integer().min(6).max(18),
    minAvgMark: Joi.number().integer().min(2).max(12),
    maxAvgMark: Joi.number().integer().min(2).max(12),
    onDuty: Joi.boolean(),
    gender: Joi.string()
      .trim()
      .valid(...Object.values(GENDERS)),
    search: Joi.string().trim().allow(''),
  }),
};
