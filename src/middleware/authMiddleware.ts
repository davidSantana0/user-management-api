import { Request, Response, NextFunction } from "express";
import { TokenPayload } from "../types/TokenPayload";
import { MESSAGES } from "../constants/messages";
import { AppError } from "../errors/AppErrror";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET as string;

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError(MESSAGES.USER.UNAUTHORIZED, 401);
  }

  const [scheme, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, SECRET) as TokenPayload;

    req.user = {
      sub: decoded.sub,
      role: decoded.role,
      iat: decoded.iat,
      exp: decoded.exp,
    };

    return next();
  } catch {
    throw new AppError(MESSAGES.USER.UNAUTHORIZED, 401);
  }
}
