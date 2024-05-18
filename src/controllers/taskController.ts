import express from "express";
import {
  createTask,
  deleteTask,
  findTaskByUser,
  searchTask,
  updateTask,
} from "../services/taskServices";

export const Create = async (req: any, res: express.Response) => {
  try {
    const { task } = req.body as { task: string };
    if (!task) {
      return res.status(400).send({ message: "Task field don't be empty" });
    }
    const date = new Date();
    const tasks = await createTask({
      task: task,
      created_date: date.toLocaleString("AO", {
        timeZone: "Africa/Luanda",
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }),
      User: req.userId,
    });
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

export const FindTasks = async (req: any, res: express.Response) => {
  try {
    const id = req.userId;
    const tasks = await findTaskByUser(id);
    if (tasks.length === 0) {
      return res
        .status(404)
        .send({ message: "Tasks where this user id not found" });
    }
    res.status(200).send(tasks);
  } catch (error) {
    if (error instanceof Error) {
      console.error({ message: error.message });
      return res.status(400).send({ message: error.message });
    }
  }
};

export const SearchTasks = async (req: any, res: express.Response) => {
  try {
    const id = req.userId;
    const { text } = req.body as { text: string };
    if (!text) {
      return res.status(400).send({ message: "text required" });
    }
    const Task = await searchTask(id, text);
    if (Task.length === 0) {
      return res.status(400).send({ message: "Task where user id not found" });
    }
    res.status(200).send(Task);
  } catch (error) {
    if (error instanceof Error) {
      console.log({ message: error.message });
      return res.status(500).send({ message: error.message });
    }
  }
};

export const UpdadeTasks = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params as { id: string };
    const { task, status } = req.body as { task: string; status: boolean };
    if (!id) {
      return res.status(400).send({ message: "Id required" });
    }
    const Task = await updateTask(id, task, status);
    if (!Task) {
      return res.status(400).send({ message: "Task wasn't updated" });
    }
    res.status(200).send({ message: "Task has been updated" });
  } catch (error) {
    if (error instanceof Error) {
      console.log({ message: error.message });
      return res.status(500).send({ message: error.message });
    }
  }
};

export const DeleteTasks = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params as { id: string };
    if (!id) {
      return res.status(400).send({ message: "Id required" });
    }
    const Task = await deleteTask(id);
    if (!Task) {
      return res.status(400).send({ message: "Task wasn't deleted" });
    }
    res.status(200).send({ message: "Task deleted" });
  } catch (error) {
    if (error instanceof Error) {
      console.log({ message: error.message });
      return res.status(500).send({ message: error.message });
    }
  }
};
