import { Router } from 'express';
import { celebrate } from 'celebrate';
import { createSubscription } from '../controllers/subscriptionsController.js';
import { createSubscriptionSchema } from '../validations/subscriptionValidation.js';

const router = Router();

router.post(
  '/api/subscriptions',
  celebrate(createSubscriptionSchema),
  createSubscription,
);

export default router;
