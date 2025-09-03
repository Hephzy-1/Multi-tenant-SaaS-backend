import asyncHandler from "../middleware/async";
import { UserUsecase } from "../usecase/User";
import { AppResponse } from "../utils/AppResponse";
import { ErrorResponse } from "../utils/ErrorResponse";
import { register } from "../validators/user";

const registerUser = asyncHandler(async (req, res, next) => {
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