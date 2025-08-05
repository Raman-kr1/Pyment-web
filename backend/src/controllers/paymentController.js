import { stripe } from '../config/stripe.js';
import Order from '../models/Order.js';
import Payment from '../models/Payment.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import crypto from 'crypto';

export const createPaymentIntent = asyncHandler(async (req, res) => {
  const { orderId } = req.body;
  const order = await Order.findById(orderId);
  if (!order) return res.status(404).json({ message: 'Order not found' });

  const idempotencyKey = crypto.randomUUID();
  const intent = await stripe.paymentIntents.create({
    amount: order.amount,
    currency: order.currency,
    metadata: { orderId: order.id, userId: order.user.toString() }
  }, { idempotencyKey });

  await Payment.create({ order: order._id, stripeIntentId: intent.id, status: intent.status });
  order.paymentIntentId = intent.id;
  await order.save();

  res.json({ clientSecret: intent.client_secret });
});