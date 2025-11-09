import { Joi, Segments } from 'celebrate';

export const getCategoriesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(3).max(24).default(6),
  })
};
