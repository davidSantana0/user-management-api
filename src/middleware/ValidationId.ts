import { Request, Response, NextFunction } from "express";
import { isValidObjectId } from "mongoose";

export function checkObjectId(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ ERROR: "Invalid Id." });
  }

  next();
}
