import { Task } from "../models/taskModel";

export const createTask = (values: Record<string, any>) => Task.create(values);

export const findTask = () => Task.find().populate("User");

export const updateTask = (id: string, task: string) =>
  Task.findOneAndUpdate({ _id: id }, { task: task });

export const searchTask = (task: string) =>
  Task.find({ task: { $regex: `${task || " "}`, $options: "i" } }).populate("User");
