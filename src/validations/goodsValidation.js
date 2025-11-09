import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const goodIdParamSchema = {
  [Segments.PARAMS]: Joi.object({
    goodId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const getGoodsSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(8),
    category: Joi.string().custom(objectIdValidator),
    priceMin: Joi.number().positive(),
    priceMax: Joi.number().positive(),

    size: Joi.string().valid('XS', 'S', 'M', 'L', 'XL', 'XXL'),

    gender: Joi.string().valid('man', 'women', 'unisex'),
  }).with('priceMin', 'priceMax'),
};
