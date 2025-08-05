import express from 'express';
import { createPaymentIntent } from '../controllers/paymentController.js';
import { protect } from '../middleware/auth.js';
const router = express.Router();
router.post('/intent', protect, createPaymentIntent);
export default router;