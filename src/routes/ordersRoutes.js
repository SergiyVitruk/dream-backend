import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  createOrder,
  getUserOrders,
} from '../controllers/ordersControllers.js';
import { createOrderSchema } from '../validations/orderValidation.js';

const router = Router();

router.post('/api/orders', celebrate(createOrderSchema), createOrder);
router.get('/api/orders/my', getUserOrders);

export default router;
