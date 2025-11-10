import createHttpError from 'http-errors';
import { User } from '../models/user.js';

// --- Отримати поточного користувача ---
export const getCurrentUser = async (req, res, next) => {
  try {
    const user = req.user;
    res.status(200).json({
      _id: user._id,
      name: user.name,
      surname: user.surname,
      phone: user.phone,
      role: user.role,
      createdAt: user.createdAt,
    });
  } catch (error) {
    next(error);
  }
};

// --- Оновити дані поточного користувача ---
export const updateCurrentUser = async (req, res, next) => {
  try {
    const { name, surname, phone } = req.body;

    // Якщо користувач нічого не передав
    if (!name && !surname && !phone) {
      throw createHttpError(400, 'Вкажіть хоча б одне поле для оновлення');
    }

    // Якщо телефон змінюється — перевіряємо, чи він вільний
    if (phone) {
      const existingUser = await User.findOne({ phone });
      if (
        existingUser &&
        existingUser._id.toString() !== req.user._id.toString()
      ) {
        throw createHttpError(400, 'Цей номер телефону вже використовується');
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, surname, phone },
      { new: true },
    );

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      surname: updatedUser.surname,
      phone: updatedUser.phone,
      role: updatedUser.role,
    });
  } catch (error) {
    next(error);
  }
};
