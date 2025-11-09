import { Router } from 'express';
import { getGoods, getGoodsById } from '../controllers/goodsControllers.js';

const router = Router();

router.get('/api/goods', getGoods);
router.get('/api/goods/:goodId', getGoodsById);

export default router;
