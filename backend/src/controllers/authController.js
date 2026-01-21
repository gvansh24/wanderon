import User from '../models/User.js';
import { generateToken } from '../config/jwt.js';

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: {
          message: existingUser.email === email 
            ? 'Email already registered' 
            : 'Username already taken',
          code: 'DUPLICATE_ERROR',
        },
      });
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      data: {
        message: 'User registered successfully',
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        error: {
          message: 'Invalid email or password',
          code: 'INVALID_CREDENTIALS',
        },
      });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: {
          message: 'Invalid email or password',
          code: 'INVALID_CREDENTIALS',
        },
      });
    }

    const token = generateToken(user._id, user.email);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      data: {
        message: 'Login successful',
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res) => {
  res.clearCookie('token');
  res.json({
    success: true,
    data: {
      message: 'Logout successful',
    },
  });
};

export const getCurrentUser = async (req, res) => {
  res.json({
    success: true,
    data: {
      user: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        createdAt: req.user.createdAt,
      },
    },
  });
};

export const verifyToken = async (req, res) => {
  res.json({
    success: true,
    data: {
      message: 'Token is valid',
      user: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
      },
    },
  });
};
