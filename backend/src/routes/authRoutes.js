import express from 'express';
import { register, login, logout, getCurrentUser, verifyToken } from '../controllers/authController.js';
import { validateRegister, validateLogin, handleValidationErrors } from '../middleware/validation.js';
import { authenticate } from '../middleware/auth.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    error: {
      message: 'Too many login attempts, please try again later',
      code: 'RATE_LIMIT_EXCEEDED',
    },
  },
});

const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: {
    success: false,
    error: {
      message: 'Too many registration attempts, please try again later',
      code: 'RATE_LIMIT_EXCEEDED',
    },
  },
});

router.post('/register', registerLimiter, validateRegister, handleValidationErrors, register);
router.post('/login', authLimiter, validateLogin, handleValidationErrors, login);

router.post('/logout', authenticate, logout);
router.get('/verify', authenticate, verifyToken);
router.get('/me', authenticate, getCurrentUser);

export default router;
