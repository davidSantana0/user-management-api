import { UserSchemaType } from "../../types/UserSchema";
import { UserRole } from "../../types/UserRole";
import { Schema, model } from "mongoose";

const UserSchema = new Schema<UserSchemaType>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true, select: true },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  },
);

export const userModel = model<UserSchemaType>("User", UserSchema);
