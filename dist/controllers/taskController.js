"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTasks = exports.UpdadeTasks = exports.SearchTasks = exports.FindTasks = exports.Create = void 0;
const taskServices_1 = require("../services/taskServices");
const Create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { task } = req.body;
        if (!task) {
            return res.status(400).send({ message: "Task field don't be empty" });
        }
        const date = new Date();
        const tasks = yield (0, taskServices_1.createTask)({
            task: task,
            created_date: date.toLocaleString("AO", {
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
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).send({ message: error.message });
        }
    }
});
exports.Create = Create;
const FindTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.userId;
        const tasks = yield (0, taskServices_1.findTaskByUser)(id);
        if (tasks.length === 0) {
            return res.status(404).send({ message: "Tasks where this id not found" });
        }
        res.status(200).send(tasks);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error({ message: error.message });
            return res.status(400).send({ message: error.message });
        }
    }
});
exports.FindTasks = FindTasks;
const SearchTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.userId;
        const { text } = req.body;
        if (!text) {
            return res.status(400).send({ message: "text required" });
        }
        const Task = yield (0, taskServices_1.searchTask)(id, text);
        if (Task.length === 0) {
            return res.status(400).send({ message: "Task where user id not found" });
        }
        res.status(200).send(Task);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log({ message: error.message });
            return res.status(500).send({ message: error.message });
        }
    }
});
exports.SearchTasks = SearchTasks;
const UpdadeTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { task, status } = req.body;
        if (!id) {
            return res.status(400).send({ message: "Id required" });
        }
        const Task = yield (0, taskServices_1.updateTask)(id, task, status);
        if (!Task) {
            return res.status(400).send({ message: "Task wasn't updated" });
        }
        res.status(200).send({ message: "Task has been updated" });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log({ message: error.message });
            return res.status(500).send({ message: error.message });
        }
    }
});
exports.UpdadeTasks = UpdadeTasks;
const DeleteTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send({ message: "Id required" });
        }
        const Task = yield (0, taskServices_1.deleteTask)(id);
        if (!Task) {
            return res.status(400).send({ message: "Task wasn't deleted" });
        }
        res.status(200).send({ message: "Task deleted" });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log({ message: error.message });
            return res.status(500).send({ message: error.message });
        }
    }
});
exports.DeleteTasks = DeleteTasks;
