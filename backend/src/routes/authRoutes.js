import express from 'express';
import { register, login, logout } from '../controllers/authController.js';
import { authLimiter } from '../middleware/rateLimit.js';
const router = express.Router();
router.post('/signup', register);
router.post('/login', authLimiter, login);
router.post('/logout', logout);
export default router;