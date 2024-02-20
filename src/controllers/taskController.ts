import express from "express";
import { createTask, findTaskByUser } from "../services/taskServices";

export const Create = async (req: any, res: express.Response) => {
  try {
    const { task } = req.body as { task: string };
    if (!task) {
      return res.status(400).send({ message: "Task field don't be empty" });
    }
    const tasks = await createTask({task:task, User: req.userId});
    if (!tasks) {
      return res.status(400).send({ message: "Create task failed" });
    }
    res.status(201).send({ message: "Task has been created" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).send({ message: error.message });
    }
  }
};

export const findTasks = async (req: any, res: express.Response) => {
  try {
    const id = req.userId;
    const tasks = await findTaskByUser(id);
    if (!tasks) {
      return res.status(404).send({ message: "No tasks founds" });
    }
    res.status(200).send(tasks);
  } catch (error) {
    if (error instanceof Error) {
      console.error({ message: error.message });
      return res.status(400).send({ message: error.message });
    }
  }
};
