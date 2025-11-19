import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import { Session } from '../models/session.js';
import { createSession, setSessionCookies } from '../services/auth.js';

export const registerUser = async (req, res, next) => {
  try {
    const { name, phone, password } = req.body;

    // Перевіряємо, чи користувач із таким номером уже існує
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      throw createHttpError(400, 'Цей номер телефону вже використовується');
    }

    // Хешуємо пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Створюємо користувача
    const newUser = await User.create({
      name,
      phone,
      password: hashedPassword,
    });

    // Створюємо нову сесію
    const newSession = await createSession(newUser._id);
    // 2. Викликаємо, передаємо об'єкт відповіді та сесію
    setSessionCookies(res, newSession);

    // Відповідь без пароля
    res.status(201).json({
      message: 'Користувача успішно створено',
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { phone, password } = req.body;

    //  Перевіряємо, чи існує користувач з таким номером
    const user = await User.findOne({ phone });
    if (!user) {
      throw createHttpError(401, 'Невірний номер телефону або пароль');
    }

    //  Перевіряємо пароль
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw createHttpError(401, 'Невірний номер телефону або пароль');
    }

    // Видаляємо стару сесію користувача
    await Session.deleteOne({ userId: user._id });

    // Створюємо нову сесію
    const newSession = await createSession(user._id);

    // 3. Викликаємо, передаємо об'єкт відповіді та сесію
    setSessionCookies(res, newSession);

    //  Повертаємо користувача без пароля
    res.status(200).json({
      message: 'Вхід виконано успішно',
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res) => {
  const { sessionId } = req.cookies;

  if (sessionId) {
    await Session.deleteOne({ _id: sessionId });
  }

  res.clearCookie('sessionId');
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

export const refreshUserSession = async (req, res, next) => {
  // 1. Знаходимо поточну сесію за id сесії та рефреш токеном
  const session = await Session.findOne({
    _id: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  // 2. Якщо такої сесії нема, повертаємо помилку
  if (!session) {
    return next(createHttpError(401, 'Session not found'));
  }

  // 3. Якщо сесія існує, перевіряємо валідність рефреш токена
  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  // Якщо термін дії рефреш токена вийшов, повертаємо помилку
  if (isSessionTokenExpired) {
    return next(createHttpError(401, 'Session token expired'));
  }

  // 4. Якщо всі перевірки пройшли добре, видаляємо поточну сесію
  await Session.deleteOne({
    _id: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  // 5. Створюємо нову сесію та додаємо кукі
  const newSession = await createSession(session.userId);
  setSessionCookies(res, newSession);

  res.status(200).json({
    message: 'Session refreshed',
  });
};
