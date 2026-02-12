import { UserRole } from "./UserRole";
import { Types } from "mongoose";

export interface User {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt?: Date;
}
