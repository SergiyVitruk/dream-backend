import { Router } from 'express';
import { celebrate } from 'celebrate';
import { createOrder } from '../controllers/ordersControllers.js';
import { createOrderSchema } from '../validations/orderValidation.js';

const router = Router();

router.post('/api/orders', celebrate(createOrderSchema), createOrder);

export default router;
