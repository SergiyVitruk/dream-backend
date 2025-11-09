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

export const getUserOrders = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};
