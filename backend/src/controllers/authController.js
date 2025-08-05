import User from '../models/User.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

export const register = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.create({ email, password });
  const token = user.getSignedJwt();
  res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 900000 });
  res.status(201).json({ user: { id: user._id, email: user.email } });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password)))
    return res.status(401).json({ message: 'Invalid credentials' });
  const token = user.getSignedJwt();
  res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 900000 });
  res.json({ user: { id: user._id, email: user.email } });
});

export const logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
};

export const getMe = asyncHandler(async (req, res) => {
  res.json({ user: req.user });
});