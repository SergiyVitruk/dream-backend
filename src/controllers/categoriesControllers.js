import { Category } from '../models/category.js';

export const getCategories = async (req, res) => {
  const { page = 1, perPage = 6 } = req.query;
  const skip = (page - 1) * perPage;

  const categoriesQuery = Category.find();

  const [totalItems, categories] = await Promise.all([
    categoriesQuery.clone().countDocuments(),
    categoriesQuery.skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalItems / perPage);

  res.status(200).json({ page, perPage, totalItems, totalPages, categories });
};
