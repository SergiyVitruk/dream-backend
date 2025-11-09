import { Router } from 'express';
import { getCategories } from '../controllers/categoriesControllers.js';

const router = Router();

router.get('/api/categories', getCategories);

export default router;
