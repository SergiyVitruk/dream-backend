import { Order } from '../models/order.js';

export const createOrder = async (req, res, next) => {
  try {
    const { goods } = req.body;
    const totalAmount = goods.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const newOrder = await Order.create({
      ...req.body,
      totalAmount,
    });

    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
};
