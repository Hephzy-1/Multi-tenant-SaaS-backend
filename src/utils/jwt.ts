import jwt from 'jsonwebtoken';
import { IUser } from '../models/user';
import env from '../config/env';
import { ErrorResponse } from './ErrorResponse';

const JWT_SECRET = env.JWT_SECRET;
const JWT_EXPIRES_IN = env.JWT_EXPIRES_IN;

if (!JWT_SECRET || !JWT_EXPIRES_IN) {
  throw new ErrorResponse('JWT_SECRET and JWT_EXPIRES_IN must be set in environment variables', 500);
}

export const generateToken = async (user: IUser) => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export const verifyToken = async (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new ErrorResponse('Invalid token', 401);
  }
}