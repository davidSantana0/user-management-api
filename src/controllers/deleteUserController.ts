import { DeleteUserService } from "../services/DeleteUserService";
import { MESSAGES } from "../constants/messages";
import { Request, Response } from "express";

export class DeleteUserController {
  handle = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const service = new DeleteUserService();

    const delUser = await service.execute(id);

    return res
      .status(200)
      .json({ message: MESSAGES.USER.DELETED, data: delUser });
  };
}
