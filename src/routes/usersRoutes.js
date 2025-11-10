import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {
  getCurrentUser,
  updateCurrentUser,
} from '../controllers/userController.js';

const router = Router();

// Отримати поточного користувача
router.get('/api/users/current', authenticate, getCurrentUser);

// Оновити поточного користувача
router.patch('/api/users/current', authenticate, updateCurrentUser);

export default router;
