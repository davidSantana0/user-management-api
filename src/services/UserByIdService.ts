import { userModel } from "../database/models/User";
import { MESSAGES } from "../constants/messages";
import { AppError } from "../errors/AppErrror";
import { Types } from "mongoose";

export class UserByIdService {
  async execute(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new AppError(MESSAGES.USER.INVALID_ID, 400);
    }
    let user = await userModel.findById(id);

    if (!user) {
      throw new AppError(MESSAGES.USER.NOT_FOUD, 404);
    }
    return user;
  }
}
