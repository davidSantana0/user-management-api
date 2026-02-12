import { Request, Response, NextFunction } from "express";

export function emptyFields(req: Request, res: Response, next: NextFunction) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new Error("Fill in all the fields to gain login access.");
  }

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    throw new Error("The fields must be strings.");
  }

  if (password.length < 5) {
    throw new Error("Password must have at least 5 characters.");
  }

  next();
}
