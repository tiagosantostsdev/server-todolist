"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const taskController_1 = require("../controllers/taskController");
exports.taskRoutes = express_1.default.Router();
exports.taskRoutes.post("/create", authMiddleware_1.authUser, taskController_1.Create);
exports.taskRoutes.get("/", authMiddleware_1.authUser, taskController_1.FindTasks);
exports.taskRoutes.get("/search", authMiddleware_1.authUser, taskController_1.SearchTasks);
exports.taskRoutes.patch("/update/:id", authMiddleware_1.authUser, taskController_1.UpdadeTasks);
exports.taskRoutes.delete("/delete/:id", authMiddleware_1.authUser, taskController_1.DeleteTasks);
