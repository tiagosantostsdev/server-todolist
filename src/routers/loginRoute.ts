import express from "express"
import { userLogin } from "../controllers/loginController"

export const loginRoute = express.Router()

loginRoute.post("/signin", userLogin)