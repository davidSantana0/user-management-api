import { UpdateUserService } from "../services/UpdateUserService";
import { TokenPayload } from "../types/TokenPayload";
import { MESSAGES } from "../constants/messages";
import { Request, Response } from "express";

export class UpdateUserController {
  handle = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const service = new UpdateUserService();

    const UpUser = await service.execute(
      id,
      name,
      email,
      req.user as TokenPayload,
    );

    return res
      .status(200)
      .json({ message: MESSAGES.USER.UPDATED, data: UpUser });
  };
}
