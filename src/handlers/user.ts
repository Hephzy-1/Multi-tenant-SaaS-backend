import asyncHandler from "../middleware/async";
import { UserUsecase } from "../usecase/User";
import { AppResponse } from "../utils/AppResponse";
import { ErrorResponse } from "../utils/ErrorResponse";
import { comparePassword } from "../utils/hash";
import { login, register } from "../validators/user";

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

  return AppResponse(res, 201, { user: newUser.user, OTP: newUser.OTP }, 'User registered successfully');
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

  return AppResponse(res, 200, { user: userExists }, 'User logged in successfully');
})