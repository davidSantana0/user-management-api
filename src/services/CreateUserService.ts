// The service does not receive requests or responses.
import { CreateUserDto } from "../dtos/creat-user.dto";
import { userModel } from "../database/models/User";
import { UserResponseDto } from "../dtos/User.dto";
import { MESSAGES } from "../constants/messages";
import { AppError } from "../errors/AppErrror";
import { UserRole } from "../types/UserRole";
import { hashPassword } from "../utils/hash";

export class CreateUserService {
  async execute({
    name,
    email,
    password,
    role = UserRole.USER,
  }: CreateUserDto): Promise<UserResponseDto> {
    const emailAlreadyExists = await userModel.findOne({ email });

    if (emailAlreadyExists) {
      throw new AppError(MESSAGES.USER.ALREADY_EXISTING, 409);
    }

    const hashedPassword = await hashPassword(password);

    const createdUser = await userModel.create({
      name,
      email,
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
