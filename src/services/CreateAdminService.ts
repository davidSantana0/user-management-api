import { CreateUserDto } from "../dtos/creat-user.dto";
import { TokenPayload } from "../types/TokenPayload";
import { userModel } from "../database/models/User";
import { UserResponseDto } from "../dtos/User.dto";
import { MESSAGES } from "../constants/messages";
import { AppError } from "../errors/AppErrror";
import { UserRole } from "../types/UserRole";
import { hashPassword } from "../utils/hash";

export class CreateAdminService {
  async execute(
    { name, email, password, role = UserRole.USER }: CreateUserDto,
    loggedUser: TokenPayload,
  ): Promise<UserResponseDto> {
    if (role === UserRole.ADMIN && loggedUser.role !== UserRole.ADMIN) {
      throw new AppError(MESSAGES.USER.FORBIDDEN, 403);
    }

    const emailAlreadyExists = await userModel.findOne({
      email: { $regex: new RegExp(`^${email}$`, "i") },
    });

    if (emailAlreadyExists) {
      throw new AppError(MESSAGES.USER.ALREADY_EXISTING, 409);
    }

    const hashedPassword = await hashPassword(password);

    const createdUser = await userModel.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
    });

    return {
      id: createdUser._id.toString(),
      name: createdUser.name,
      email: createdUser.email,
      role: createdUser.role,
      createdAt: createdUser.createdAt,
    };
  }
}
