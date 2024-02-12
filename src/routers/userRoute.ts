import express from "express";
import { Create, Delete, Find, Update } from "../controllers/userController";

export const userRoute = express.Router();

userRoute.post("/newuser", Create)

userRoute.get("/", Find)

userRoute.patch("/update/:id", Update)

userRoute.delete("/delete/acount/:id", Delete)