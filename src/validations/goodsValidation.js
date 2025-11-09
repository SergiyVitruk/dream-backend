import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const goodIdParamSchema = {
  [Segments.PARAMS]: Joi.object({
    goodId: Joi.string().custom(objectIdValidator).required().messages({
      'any.required': 'Product ID (goodId) is required',
      'string.base': 'Product ID must be a string',
      'string.empty': 'Product ID cannot be empty',
    }),
  }),
};

export const getGoodsSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1).messages({
      'number.base': 'Page must be a number',
      'number.integer': 'Page must be an integer',
      'number.min': 'Page number must be at least 1',
    }),
    perPage: Joi.number().integer().min(4).max(24).default(8).messages({
      'number.base': 'PerPage must be a number',
      'number.integer': 'PerPage must be an integer',
      'number.min': 'PerPage must be at least 4',
      'number.max': 'PerPage cannot exceed 24',
    }),

    category: Joi.string().custom(objectIdValidator).messages({
      'string.base': 'Category ID must be a string',
      'string.empty': 'Category ID cannot be empty',
    }),

    priceMin: Joi.number().positive().messages({
      'number.base': 'Minimum price must be a number',
      'number.positive': 'Minimum price must be positive',
    }),
    priceMax: Joi.number().positive().messages({
      'number.base': 'Maximum price must be a number',
      'number.positive': 'Maximum price must be positive',
    }),

    size: Joi.string().valid('XS', 'S', 'M', 'L', 'XL', 'XXL').messages({
      'string.base': 'Size must be a string',
      'any.only': 'Size must be one of XS, S, M, L, XL, XXL',
    }),

    gender: Joi.string().valid('man', 'women', 'unisex'),
  }).messages({
    'string.base': 'Gender must be a string',
    'any.only': 'Gender must be one of: man, women, unisex',
  }),
};
