import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  date: { type: String, required: true},
  gender: { type: String, required: true},
  password: { type: String, required: true, select: false },
  isVerified: { type: Boolean, default: false },
});

export const User = mongoose.model("users", userSchema);
