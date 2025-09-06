import asyncHandler from "../middleware/async";
import { UserUsecase } from "../usecase/User";
import { AppResponse } from "../utils/AppResponse";
import { ErrorResponse } from "../utils/ErrorResponse";
import { comparePassword } from "../utils/hash";
import { forgetPass, login, register } from "../validators/user";
import { generateToken } from "../utils/jwt";
import crypto from 'crypto';

export const registerUser = asyncHandler(async (req, res, next) => {
  const { error, value } = register.validate(req.body);

  if (error) {
    throw next(new ErrorResponse(error.details[0].message, 400));
  }

  const { name, email, password, phone, role } = value;

  const userExists = await UserUsecase.getUserByEmail(email);
  if (userExists) {
    throw next(new ErrorResponse('User already exists', 400));
  }

  const newUser = await UserUsecase.registerUser(value);

  const token = await generateToken(newUser.user.id, email, role)

  return AppResponse(res, 201, { user: newUser.user, OTP: newUser.OTP, token }, 'User registered successfully');
});

export const loginUser = asyncHandler(async (req, res, next) => {
  const { error, value } = login.validate(req.body);

  if (error) {
    throw next(new ErrorResponse(error.details[0].message, 400));
  }

  const { email, password } = value;

  const userExists = await UserUsecase.getUserByEmail(email);
  if (!userExists || !userExists.password) {
    throw next(new ErrorResponse("Invalid credentials", 401));
  }

  const isMatch = await comparePassword(password, userExists.password);

  if (!isMatch) {
    throw next(new ErrorResponse("Invalid credentials", 401));
  }

  const token = await generateToken(userExists.id, userExists.email, userExists.role)

  return AppResponse(res, 200, { user: userExists, token }, 'User logged in successfully');
});

export const forgetPassword = asyncHandler(async (req, res, next) => {
  const { error, value } = forgetPass.validate(req.body);

  if (error) throw next(new ErrorResponse(error.details[0].message, 400));

  const userExists = await UserUsecase.getUserByEmail(value);

  if (!userExists) throw next(new ErrorResponse(`Email doesn't exist in our database`, 401));

  const OTP = Array(6).fill(0).map(() => Math.floor(Math.random() * 10)).join('');
  const OTPHash = crypto.createHash('sha256').update(OTP).digest('hex')
})