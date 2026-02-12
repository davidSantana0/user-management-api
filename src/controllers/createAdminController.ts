import { CreateAdminService } from "../services/CreateAdminService";
import { MESSAGES } from "../constants/messages";
import { Request, Response } from "express";

export class CreateAdminController {
  handle = async (req: Request, res: Response) => {
    const service = new CreateAdminService();

    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Sessão inválida ou usuário não autenticado" });
    }

    const user = await service.execute(req.body, req.user);

    return res.status(201).json({
      message: MESSAGES.USER.CREATED,
      data: user,
    });
  };
}
