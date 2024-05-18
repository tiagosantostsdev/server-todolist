import express from "express";
import { Create, Delete, Find, Update, VerifyEmail } from "../controllers/userController";

export const userRoute = express.Router();

userRoute.post("/newuser", Create)

userRoute.get("/verify-email/:token", VerifyEmail)

userRoute.get("/", Find)

userRoute.patch("/update/:id", Update)

userRoute.delete("/delete/:id", Delete)
