import { Joi, Segments } from 'celebrate';

export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    username: Joi.string().min(3).max(30).required().messages({
      'string.empty': 'Поле "username" є обов’язковим',
      'string.min': 'Ім’я користувача має містити щонайменше 3 символи',
      'any.required': 'Поле "username" є обов’язковим',
    }),
    phone: Joi.string()
      .pattern(/^\+?\d{10,15}$/)
      .required()
      .messages({
        'string.pattern.base':
          'Некоректний номер телефону. Приклад: +380971234567 або 0971234567',
        'string.empty': 'Поле "phone" є обов’язковим',
        'any.required': 'Поле "phone" є обов’язковим',
      }),
    password: Joi.string().min(8).required().messages({
      'string.min': 'Пароль має містити щонайменше 8 символів',
      'string.empty': 'Поле "password" є обов’язковим',
      'any.required': 'Поле "password" є обов’язковим',
    }),
  }),
};
export const loginUserSchema = {
  [Segments.BODY]: Joi.object({
    phone: Joi.string()
      .pattern(/^\+?\d{10,15}$/)
      .required()
      .messages({
        'string.pattern.base':
          'Некоректний номер телефону. Приклад: +380971234567 або 0971234567',
        'string.empty': 'Поле "phone" є обов’язковим',
        'any.required': 'Поле "phone" є обов’язковим',
      }),
    password: Joi.string().min(8).required().messages({
      'string.min': 'Пароль має містити щонайменше 8 символів',
      'string.empty': 'Поле "password" є обов’язковим',
      'any.required': 'Поле "password" є обов’язковим',
    }),
  }),
};
