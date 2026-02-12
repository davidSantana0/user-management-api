import { CreateUserService } from "../services/CreateUserService";
import { CreateUserDto } from "../dtos/creat-user.dto";
import { MESSAGES } from "../constants/messages";
import { Request, Response } from "express";

type CreateUserRequest = Request<unknown, unknown, CreateUserDto>;
export class CreateUserController {
  handle = async (req: CreateUserRequest, res: Response) => {
    const { name, email, password } = req.body;
    const service = new CreateUserService();
    const user = await service.execute({ name, email, password });
    return res.status(201).json({ message: MESSAGES.USER.CREATED, data: user });
  };
}
