import { UserByIdService } from "../services/UserByIdService";
import { Request, Response } from "express";

export class UserByIdController {
  handle = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;

    const service = new UserByIdService();
    const user = await service.execute(id);

    return res.status(200).json({ user });
  };
}
