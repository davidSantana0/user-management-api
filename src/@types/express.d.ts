import { TokenPayload } from "../types/TokenPayload";
import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}
