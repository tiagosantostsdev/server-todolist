import express from "express"
import { authUser } from "../middlewares/authMiddleware"
import { Create, findTasks } from "../controllers/taskController"

export const taskRoutes = express.Router()

taskRoutes.post("/newtask", authUser, Create)

taskRoutes.get("/", authUser, findTasks) 