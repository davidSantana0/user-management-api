import { LoginService } from "../services/LoginUserService";
import { Request, Response } from "express";

export class LoginController {
  handle = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const service = new LoginService();
    const result = await service.execute(email, password);

    return res.status(200).json(result);
  };
}
