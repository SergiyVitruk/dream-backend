import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const createFeedbackSchema = {
  [Segments.BODY]: Joi.object({
    author: Joi.string().min(2).max(50).required().messages({
      'string.base': 'Author must be a string',
      'string.empty': 'Author is required',
      'string.min': 'Author name must be at least 2 characters',
      'string.max': 'Author name must be less than or equal to 50 characters',
    }),

    description: Joi.string().min(10).max(1000).required().messages({
      'string.base': 'Description must be a string',
      'string.empty': 'Description is required',
      'string.min': 'Description must be at least 10 characters',
      'string.max': 'Description must be less than or equal to 1000 characters',
    }),

    rate: Joi.number().min(0.5).max(5).precision(1).required().messages({
      'number.base': 'Rate must be a number',
      'number.min': 'Rate must be at least 0.5',
      'number.max': 'Rate must be at most 5',
      'any.required': 'Rate is required',
    }),

    category: Joi.string().required().messages({
      'any.required': 'Category ID is required',
    }),

    productId: Joi.string().custom(objectIdValidator).required().messages({
      'any.required': 'Product ID is required',
    }),
  }),
};
