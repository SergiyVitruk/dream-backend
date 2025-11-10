import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import { STATUS } from '../constants/filter.js';

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value)
    ? helpers.message('Invalid product ID format')
    : value;
};

const orderItemSchema = Joi.object({
  productId: Joi.string().custom(objectIdValidator).required().messages({
    'any.required': 'Product ID is required',
    'string.empty': 'Product ID cannot be empty',
  }),
  title: Joi.string().min(2).max(100).required().messages({
    'string.base': 'Product title must be a string',
    'string.empty': 'Product title is required',
    'string.min': 'Product title must be at least 2 characters',
    'string.max': 'Product title must be less than 100 characters',
  }),
  quantity: Joi.number().integer().min(1).required().messages({
    'number.base': 'Quantity must be a number',
    'number.min': 'Quantity must be at least 1',
    'any.required': 'Quantity is required',
  }),
  price: Joi.number().min(0).required().messages({
    'number.base': 'Price must be a number',
    'number.min': 'Price cannot be negative',
    'any.required': 'Price is required',
  }),
  total: Joi.number().min(0).required().messages({
    'number.base': 'Total must be a number',
    'number.min': 'Total cannot be negative',
    'any.required': 'Total is required',
  }),
});

export const createOrderSchema = {
  [Segments.BODY]: Joi.object({
    goods: Joi.array().items(orderItemSchema).min(1).required().messages({
      'array.base': 'Goods must be an array',
      'array.min': 'Order must contain at least one product',
      'any.required': 'Goods are required',
    }),

    totalAmount: Joi.number().min(0).required().messages({
      'number.base': 'Total amount must be a number',
      'any.required': 'Total amount is required',
    }),

    name: Joi.string().min(2).max(50).required().messages({
      'string.base': 'Name must be a string',
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 2 characters',
      'string.max': 'Name must be less than 50 characters',
    }),

    surname: Joi.string().min(2).max(50).required().messages({
      'string.base': 'Surname must be a string',
      'string.empty': 'Surname is required',
      'string.min': 'Surname must be at least 2 characters',
      'string.max': 'Surname must be less than 50 characters',
    }),

    phone: Joi.string()
      .pattern(/^\+?\d{10,15}$/)
      .required()
      .messages({
        'string.pattern.base': 'Phone number must be valid',
        'string.empty': 'Phone is required',
        'any.required': 'Phone is required',
      }),

    city: Joi.string().min(2).max(100).required().messages({
      'string.base': 'City must be a string',
      'string.empty': 'City is required',
      'string.min': 'City must be at least 2 characters',
      'string.max': 'City must be less than 100 characters',
    }),

    postNumber: Joi.string().min(1).max(10).required().messages({
      'string.base': 'Post number must be a string',
      'string.empty': 'Post number is required',
      'any.required': 'Post number is required',
    }),

    comment: Joi.string().max(500).allow('', null).messages({
      'string.max': 'Comment must be less than 500 characters',
    }),
  }),
};

export const updateOrderStatusSchema = {
  [Segments.BODY]: Joi.object({
    status: Joi.string()
      .valid(...STATUS)
      .required()
      .messages({
        'any.required': 'Status is required',
        'any.only': `Status must be one of: ${STATUS.join(', ')}`,
      }),
  }),
};
