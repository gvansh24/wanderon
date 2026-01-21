import { verifyToken } from '../config/jwt.js';
import User from '../models/User.js';

export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        error: {
          message: 'Authentication required. Please log in.',
          code: 'NO_TOKEN',
        },
      });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        error: {
          message: 'Invalid or expired token. Please log in again.',
          code: 'INVALID_TOKEN',
        },
      });
    }

    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(401).json({
        success: false,
        error: {
          message: 'User not found.',
          code: 'USER_NOT_FOUND',
        },
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        message: 'Authentication error',
        code: 'AUTH_ERROR',
      },
    });
  }
};
