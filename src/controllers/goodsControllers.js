import { Good } from '../models/good.js';

export const getGoods = async (req, res) => {
  const goods = await Good.find();
  res.status(200).json(goods);
};

export const getGoodsById = async (req, res) => {
   const { goodId } = req.params;
   const good = await Good.findById(goodId);

   if (!good) {
     return res.status(404).json({ message: 'Good not found' });
   }

   res.status(200).json(good);
};
