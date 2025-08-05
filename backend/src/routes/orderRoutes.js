import express from 'express';
import { createOrder, getOrder } from '../controllers/orderController.js';
import { protect } from '../middleware/auth.js';
const router = express.Router();
router.post('/', protect, createOrder);
router.get('/:id', protect, getOrder);
export default router;