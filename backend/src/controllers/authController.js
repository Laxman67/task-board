import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { loginSchema, registerSchema } from '../middleware/validate.js';

export const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: '30d'
  });
};


export const register = async (req, res, next) => {
  try {

    const { value, error } = registerSchema.validate(req.body);


    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.details
      });
    }

    const { firstname, lastname, email, password } = value;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });

    }

    const user = new User({ firstname, lastname, email, password });
    await user.save();

    const token = generateToken(user._id);

    res.status(201).cookie('token', token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: 'lax'
    }).json({
      success: true,
      message: 'User registered successfully',
      data: {
        token,
        user
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
};

export const login = async (req, res, next) => {
  try {
    // TODO: Validate the request body


    const { value, error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.details
      });
    }

    const { email, password } = value;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const token = generateToken(user._id);


    res.status(200).cookie('token', token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: 'lax'
    }).json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user._id,
          email: user.email
        }
      }
    });
  } catch (error) {


    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
};


