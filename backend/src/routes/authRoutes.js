import express from 'express';
import { register, login, logout, getCurrentUser, verifyToken } from '../controllers/authController.js';
import { validateRegister, validateLogin, handleValidationErrors } from '../middleware/validation.js';
import { authenticate } from '../middleware/auth.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
  message: {
    success: false,
    error: {
      message: 'Too many login attempts, please try again later',
      code: 'RATE_LIMIT_EXCEEDED',
    },
  },
});

const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 registrations per hour
  message: {
    success: false,
    error: {
      message: 'Too many registration attempts, please try again later',
      code: 'RATE_LIMIT_EXCEEDED',
    },
  },
});

// Public routes
router.post('/register', registerLimiter, validateRegister, handleValidationErrors, register);
router.post('/login', authLimiter, validateLogin, handleValidationErrors, login);

// Protected routes
router.post('/logout', authenticate, logout);
router.get('/verify', authenticate, verifyToken);
router.get('/me', authenticate, getCurrentUser);

export default router;
