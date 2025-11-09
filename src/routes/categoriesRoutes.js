import { Router } from 'express';
import { getCategories } from '../controllers/categoriesControllers.js';
import { celebrate } from 'celebrate';
import { getCategoriesSchema } from '../validations/categoryValidation.js';

const router = Router();

router.get('/api/categories', celebrate(getCategoriesSchema) ,getCategories);

export default router;
