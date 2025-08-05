import express from 'express';
import { register, login, logout, getMe } from '../controllers/authController.js';
import { authLimiter } from '../middleware/rateLimit.js';
import { protect } from '../middleware/auth.js'; // <-- Import protect

const router = express.Router();

router.post('/signup', register);
router.post('/login', authLimiter, login);
router.post('/logout', logout);
router.get('/me', protect, getMe); // <-- Add this new route

export default router;