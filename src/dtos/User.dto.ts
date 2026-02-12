import { UserRole } from "../types/UserRole";

export interface UserResponseDto {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  UpdateAt?: Date;
}
