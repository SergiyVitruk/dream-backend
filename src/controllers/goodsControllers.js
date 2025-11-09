import { Good } from '../models/good.js';
import createHttpError from 'http-errors';

export const getGoods = async (req, res) => {
  const goods = await Good.find();
  res.status(200).json(goods);
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
