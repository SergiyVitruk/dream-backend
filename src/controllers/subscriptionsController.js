import { Subscription } from '../models/subscriptions.js';

export const createSubscription = async (req, res) => {
  const subscription = await Subscription.create(req.body);
  res.status(201).json(subscription);
};
