import { Task } from "../models/taskModel";

export const createTask = (values: Record<string, any>) => Task.create(values);

export const findTaskByUser = (id: string) =>
  Task.find({ User: id }).sort({ _id: -1 }).populate("User");

export const updateTask = (id: string, task: string, status: boolean) =>
  Task.findOneAndUpdate({ _id: id }, { task: task, status: status });

export const searchTask = (id: string, text: string) =>
  Task.find(
    {User:id, task: { $regex: `${text || " "}`, $options: "i" } }
  ).populate("User");

export const deleteTask = (id: string) => Task.findOneAndDelete({ _id: id });
