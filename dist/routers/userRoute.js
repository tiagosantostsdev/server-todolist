"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
exports.userRoute = express_1.default.Router();
exports.userRoute.post("/newuser", userController_1.Create);
exports.userRoute.get("/verify-email/:token", userController_1.VerifyEmail);
exports.userRoute.get("/", userController_1.Find);
exports.userRoute.patch("/update/:id", userController_1.Update);
exports.userRoute.delete("/delete/acount/:id", userController_1.Delete);
