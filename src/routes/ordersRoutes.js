import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { celebrate } from 'celebrate';
import {
  createOrder,
  getUserOrders,
  updateOrderStatus,
  updateOrderStatusSchema,
} from '../controllers/ordersControllers.js';
import { createOrderSchema } from '../validations/orderValidation.js';
import { isAdmin } from '../middleware/isAdmin.js';

const router = Router();

router.post('/api/orders', celebrate(createOrderSchema), createOrder);
router.get('/api/orders/my', authenticate, getUserOrders);
router.patch(
  '/api/orders/:id/status',
  authenticate,
  isAdmin,
  celebrate(updateOrderStatusSchema),
  updateOrderStatus,
);

export default router;
