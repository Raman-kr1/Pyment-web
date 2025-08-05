import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    productId: String,
    name: String,
    price: Number,
    qty: Number
  }],
  amount: { type: Number, required: true },
  currency: { type: String, default: 'usd' },
  status: { type: String, default: 'awaiting_payment', enum: ['awaiting_payment','paid','failed','refunded'] },
  paymentIntentId: String
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);