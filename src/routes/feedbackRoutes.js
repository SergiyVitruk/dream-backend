import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  getFeedbacks,
  createFeedback,
} from '../controllers/feedbacksControllers.js';
import { createFeedbackSchema } from '../validations/feedbackValidation.js';

const router = Router();

router.get('/api/feedbacks', getFeedbacks);
router.post('/api/feedbacks', celebrate(createFeedbackSchema), createFeedback);

export default router;
