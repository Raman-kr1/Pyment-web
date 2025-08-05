import { stripe } from '../config/stripe.js';
import Payment from '../models/Payment.js';
import Order from '../models/Order.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

export const handleWebhook = asyncHandler(async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded' || event.type === 'payment_intent.payment_failed') {
    const intent = event.data.object;
    const payment = await Payment.findOneAndUpdate(
      { stripeIntentId: intent.id },
      { status: intent.status },
      { new: true }
    );
    const order = await Order.findById(payment.order);
    order.status = intent.status === 'succeeded' ? 'paid' : 'failed';
    await order.save();
  }

  res.json({ received: true });
});