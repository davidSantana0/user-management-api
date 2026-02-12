import { UserRole } from "./UserRole";

export interface TokenPayload {
  sub: string;
  role: UserRole;
  iat: number;
  exp: number;
}
