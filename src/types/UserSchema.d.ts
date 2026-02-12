import { UserRole } from "./UserRole";

export interface UserSchemaType {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}
