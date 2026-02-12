import { SearchUserService } from "../services/SearchUserService";
import { UserResponseDto } from "../dtos/User.dto";
import { Request, Response } from "express";

export class SearchUserController {
  handle = async (
    req: Request,
    res: Response<{ Users: UserResponseDto[] }>,
  ) => {
    const service = new SearchUserService();
    const Users = await service.execute();
    return res.status(200).json({ Users });
  };
}
