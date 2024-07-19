import express from "express";
import { authUser } from "../middlewares/authMiddleware";
import {
  Create,
  DeleteTasks,
  FindTasks,
  SearchTasks,
  UpdadeTasks,
} from "../controllers/taskController";

export const taskRoutes = express.Router();

taskRoutes.post("/create", authUser, Create);

taskRoutes.get("/", authUser, FindTasks);

taskRoutes.get("/search", authUser, SearchTasks);

taskRoutes.patch("/update/:id", authUser, UpdadeTasks);

taskRoutes.delete("/delete/:id", authUser, DeleteTasks);
 