import { Request, Response, NextFunction } from "express";
import { MESSAGES } from "../constants/messages";
import { AppError } from "../errors/AppErrror";

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }
// IA
  console.error("-----------------------------------------");
  console.error("🚨 CRITICAL ERROR DETAILS 🚨:");
  console.error(`Method: ${req.method} | URL: ${req.url}`);
  console.error(err.stack);
  console.error("-----------------------------------------");

  return res.status(500).json({
    status: "error",
    message: MESSAGES.SERVER.INTERNAL_ERROR,
  });
}
