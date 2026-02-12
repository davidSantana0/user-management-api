import { TokenPayload } from "../types/TokenPayload";
import { userModel } from "../database/models/User";
import { MESSAGES } from "../constants/messages";
import { AppError } from "../errors/AppErrror";
import { UserRole } from "../types/UserRole";
import { Types } from "mongoose";

export class UpdateUserService {
  async execute(
    id: string,
    name: string,
    email: string,
    loggedUser: TokenPayload,
  ) {
    if (!Types.ObjectId.isValid(id)) {
      throw new AppError(MESSAGES.USER.INVALID_ID, 400);
    }

    if (loggedUser.role !== UserRole.ADMIN && loggedUser.sub !== id) {
      throw new AppError(MESSAGES.USER.FORBIDDEN, 403);
    }

    if (!name && !email) {
      throw new AppError(MESSAGES.USER.EMPTY_FIELDS, 400);
    }

    if (email) {
      const emailExists = await userModel.findOne({ email, _id: { $ne: id } });
      if (emailExists) {
        throw new AppError(MESSAGES.USER.ALREADY_EXISTING, 409);
      }
    }

    const UpUser = await userModel.findOneAndUpdate(
      { _id: id },
      { name, email },
      { new: true, runValidators: true },
    );

    if (!UpUser) {
      throw new AppError(MESSAGES.USER.NOT_FOUD, 404);
    }

    return {
      id: UpUser._id.toString(),
      name: UpUser.name,
      email: UpUser.email,
      role: UpUser.role,
      updatedAt: UpUser.updatedAt,
    };
  }
}
