import { userModel } from "../database/models/User";
import { UserResponseDto } from "../dtos/User.dto";
import { MESSAGES } from "../constants/messages";
import { AppError } from "../errors/AppErrror";

export class SearchUserService {
  async execute(): Promise<UserResponseDto[]> {
    const users = await userModel.find();

    if (!users) {
      throw new AppError(MESSAGES.USER.NOT_FOUD, 404);
    }
    return users.map((user) => ({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      UpdateAt: user.updatedAt,
    }));
  }
}
