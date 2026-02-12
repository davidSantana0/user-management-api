import { generateToken } from "../auth/genereteToken";
import { userModel } from "../database/models/User";
import { MESSAGES } from "../constants/messages";
import { comparePassword } from "../utils/hash";
import { AppError } from "../errors/AppErrror";

export class LoginService {
  async execute(email: string, password: string) {
    const user = await userModel.findOne({ email });

    if (!user) {
      throw new AppError(MESSAGES.USER.INVALID_LOGIN, 401);
    }

    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
      throw new AppError(MESSAGES.USER.INVALID_LOGIN, 401);
    }

    const token = generateToken(user.id.toString(), user.role);

    return { token };
  }
}
