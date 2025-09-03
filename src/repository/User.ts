import User, { IUser } from "../models/user";
import { ErrorResponse } from "../utils/ErrorResponse";
import { hashPassword } from "../utils/hash";
import crypto from 'crypto';

export class UserRespository {
  static async createUser(values: Partial<IUser>) {

    const hashedPassword = values.password ? await hashPassword(values.password) : undefined;

    const OTP = Array(6).fill(0).map(() => Math.floor(Math.random() * 10)).join('');
    const OTPHash = crypto.createHash('sha256').update(OTP).digest('hex');
    const expiry = Date.now() + 20 * 60 * 1000;

    const user = new User({
      name: values.name,
      email: values.email,
      phone: values.phone,
      role: values.role,
      password: hashedPassword,
      picture: values.picture,
      otp: OTP,
      otpExpiry: new Date(expiry),
      isVerified: false
    });
    await user.save();
    return { user, OTP };
  }

  static async getUserByEmail (email: string) {
    return await User.findOne({ email });
  }

  static async getUserById (id: string) {
    return await User.findById(id);
  }

  static async getUserByRole (role: string) {
    return await User.find({ role });
  }
}