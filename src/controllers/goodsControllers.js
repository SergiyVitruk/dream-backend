import { Good } from '../models/good.js';
import createHttpError from 'http-errors';

export const getGoods = async (req, res, next) => {
  try {
    const {
      page = 1,
      perPage = 8,
      category,
      gender,
      size,
      priceMin,
      priceMax,
    } = req.query;
    const skip = (page - 1) * perPage;

    const goodsQuery = Good.find();

    if (category) goodsQuery.where('category').equals(category);
    if (gender) goodsQuery.where('gender').equals(gender);
    if (size) goodsQuery.where('size').in([size]);

    if (priceMin || priceMax) {
      const filter = {};
      if (priceMin) filter.$gte = Number(priceMin);
      if (priceMax) filter.$lte = Number(priceMax);
      goodsQuery.where('price.value', filter);
    }

    const [totalItems, goods] = await Promise.all([
      goodsQuery.clone().countDocuments(),
      goodsQuery.skip(skip).limit(Number(perPage)).populate('category', 'name'),
    ]);

    const totalPages = Math.ceil(totalItems / perPage);

    res.status(200).json({
      page: Number(page),
      perPage: Number(perPage),
      totalItems,
      totalPages,
      goods,
    });
  } catch (error) {
    next(createHttpError(500, error.message));
  }
};

export const getGoodsById = async (req, res, next) => {
  const { goodId } = req.params;
  const good = await Good.findById(goodId);

  if (!good) {
    next(createHttpError(404, 'Good not found'));
    return;
  }

  res.status(200).json(good);
};
