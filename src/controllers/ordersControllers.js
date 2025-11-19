import { Order } from '../models/order.js';

export const createOrder = async (req, res, next) => {
  try {
    const { goods } = req.body;
    
    const totalAmount = goods.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const orderData = {
      ...req.body,
      totalAmount,
    };

    if (req.user) {
      orderData.userId = req.user._id;
    }

    const newOrder = await Order.create(orderData);

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

export const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    next(error);
  }
};
