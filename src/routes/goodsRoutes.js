import { Router } from 'express';
import { celebrate } from 'celebrate';
import { getGoods, getGoodsById } from '../controllers/goodsControllers.js';
import {
  getGoodsSchema,
  goodIdParamSchema,
} from '../validations/goodsValidation.js';

const router = Router();

router.get('/api/goods', celebrate(getGoodsSchema), getGoods);
router.get('/api/goods/:goodId', celebrate(goodIdParamSchema), getGoodsById);

export default router;
