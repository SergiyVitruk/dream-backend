import { Router } from 'express';
import { getGoods, getGoodsById } from '../controllers/studentsController.js';

const router = Router();

router.get('/api/goods', getGoods);
router.get('/api/goods/:goodId', getGoodsById);

export default router;
