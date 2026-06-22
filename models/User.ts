import { Schema, model, Document } from "mongoose";
import { IUser } from "./interfaces";

export interface IUserDocument extends IUser, Document {}

const UserSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, trim: true },
    role: { type: String, enum: ["admin", "user"], default: "admin" },
  },
  {
    timestamps: true,
  },
);

export const User = model<IUserDocument>("Usuarios", UserSchema);
