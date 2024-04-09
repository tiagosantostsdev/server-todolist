"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const taskSchema = new mongoose_1.default.Schema({
    task: { type: String, required: true },
    status: { type: Boolean, default: false },
    created_date: { type: String, required: true },
    User: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "users"
    }
});
exports.Task = mongoose_1.default.model("tasks", taskSchema);
