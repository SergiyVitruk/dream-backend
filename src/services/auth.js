import crypto from 'crypto';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/time.js';
import { Session } from '../models/session.js';

export const createSession = async (userId) => {
  try {
    // Генеруємо токени
    const accessToken = crypto.randomBytes(30).toString('base64url');
    const refreshToken = crypto.randomBytes(30).toString('base64url');

    // Створюємо сесію
    const session = await Session.create({
      userId,
      accessToken,
      refreshToken,
      accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
      refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
    });

    return session;
  } catch (error) {
    console.error('Помилка при створенні сесії:', error);
    throw error;
  }
};

export const setSessionCookies = (res, session) => {
  res.cookie('accessToken', session.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: FIFTEEN_MINUTES,
  });

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: ONE_DAY,
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: ONE_DAY,
  });
};
