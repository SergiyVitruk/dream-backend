import { Router } from 'express';
import {
  getFeedbacks,
  createFeedback,
} from '../controllers/feedbacksControllers.js';

const router = Router();

router.get('/api/feedbacks', getFeedbacks);
router.get('/api/feedbacks', createFeedback);

export default router;
