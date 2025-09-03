import { UserRespository } from "../repository/User";

export class UserUsecase {
  static async registerUser(values: Partial<UserRespository>) {
    const { user, OTP } = await UserRespository.createUser(values);
    return { user, OTP };
  }

  static async getUserByEmail(email: string) {
    return await UserRespository.getUserByEmail(email);
  }

  static async getUserById(id: string) {
    return await UserRespository.getUserById(id);
  }

  static async getUserByRole(role: string) {
    return await UserRespository.getUserByRole(role);
  }
}