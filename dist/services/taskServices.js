"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.searchTask = exports.updateTask = exports.findTaskByUser = exports.createTask = void 0;
const taskModel_1 = require("../models/taskModel");
const createTask = (values) => taskModel_1.Task.create(values);
exports.createTask = createTask;
const findTaskByUser = (id) => taskModel_1.Task.find({ User: id }).sort({ _id: -1 }).populate("User");
exports.findTaskByUser = findTaskByUser;
const updateTask = (id, task, status) => taskModel_1.Task.findOneAndUpdate({ _id: id }, { task: task, status: status });
exports.updateTask = updateTask;
const searchTask = (id, text) => taskModel_1.Task.find({ User: id, task: { $regex: `${text || " "}`, $options: "i" } }).populate("User");
exports.searchTask = searchTask;
const deleteTask = (id) => taskModel_1.Task.findOneAndDelete({ _id: id });
exports.deleteTask = deleteTask;
