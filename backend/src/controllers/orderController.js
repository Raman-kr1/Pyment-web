import Order from '../models/Order.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

export const createOrder = asyncHandler(async (req, res) => {
  const { items, amount } = req.body;
  const order = await Order.create({ user: req.user._id, items, amount });
  res.status(201).json(order);
});

export const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user','email');
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
});