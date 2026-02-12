import { UserRole } from "../types/UserRole";
import Jwt from "jsonwebtoken";
import "dotenv/config";

const SECRET = process.env.JWT_SECRET as string;
export function generateToken(id: string, role: UserRole) {
  return Jwt.sign(
    {
      sub: id,
      role,
    },
    SECRET,
    { expiresIn: "1h" },
  );
}
