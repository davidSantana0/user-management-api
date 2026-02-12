import { Request, Response, NextFunction } from "express";
import { UserRole } from "../types/UserRole";

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.user.role !== UserRole.ADMIN) {
    return res.status(403).json({ message: "Forbidden" });
  }

  return next();
}
