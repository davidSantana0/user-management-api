import { userModel } from "../database/models/User";
import { MESSAGES } from "../constants/messages";
import { AppError } from "../errors/AppErrror";

export class DeleteUserService {
  async execute(id: string) {
    const delUser = await userModel.deleteOne({ _id: id });

    if (!id || delUser.deletedCount === 0) {
      throw new AppError(MESSAGES.USER.NOT_FOUD, 404);
    }

    return delUser;
  }
}
