import express from "express";
import {
  Create,
  Delete,
  Find,
  ForgoutPassword,
  RedefinePassword,
  Update,
  VerifyEmail,
} from "../controllers/userController";

export const userRoute = express.Router();

userRoute.post("/newuser", Create);

userRoute.get("/verify-email/:token", VerifyEmail);

userRoute.get("/", Find);

userRoute.post("/forgout-password", ForgoutPassword);
userRoute.post("/redefine-password", RedefinePassword);

userRoute.patch("/update/:id", Update);

userRoute.delete("/delete/:id", Delete);
