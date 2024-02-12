import { User } from "../models/userModel";
import jwt from "jsonwebtoken";

export const findUserLogin = (email: string) =>
  User.findOne({ email: email }).select("+password");

export const generateToken = (id: string) => {
  const SECRET_JWT: string = String(process.env.SECRET_JWT);
  return jwt.sign({ id }, SECRET_JWT, { expiresIn: "1d" });
};
