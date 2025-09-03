import Joi from 'joi';

export const register = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(10).max(15).required(),
  role: Joi.string().valid('admin', 'tenant').required(),
  password: Joi.string().min(6).required(),
});

export const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export const verifyOTP = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.string().length(6).required()
});