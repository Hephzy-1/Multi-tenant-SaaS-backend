import jwt from 'jsonwebtoken';
import { IUser } from '../models/user';
import env from '../config/env';
import { ErrorResponse } from './ErrorResponse';

import type { Secret } from 'jsonwebtoken';

const JWT_SECRET: Secret = env.JWT_SECRET as Secret;
const JWT_EXPIRES_IN = env.JWT_EXPIRES_IN;

if (!JWT_SECRET || !JWT_EXPIRES_IN) {
  throw new ErrorResponse('JWT_SECRET and JWT_EXPIRES_IN must be set in environment variables', 500);
}

export const generateToken = async (id: string, email: string, role: string):Promise<string> => {

  const token = jwt.sign({ id, email, role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  return token;
}

export const verifyToken = async (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new ErrorResponse('Invalid token', 401);
  }
}