import { Joi, Segments } from 'celebrate';

export const createSubscriptionSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required().messages({
      'string.base': 'Email must be a string',
      'any.required': 'Email is required',
    }),
  }),
};
