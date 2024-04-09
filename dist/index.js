"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./database/db");
const userRoute_1 = require("./routers/userRoute");
const loginRoute_1 = require("./routers/loginRoute");
const taskRoute_1 = require("./routers/taskRoute");
dotenv_1.default.config({ path: "./src/.env" });
//Instace express
const app = (0, express_1.default)();
//database connection
(0, db_1.dbConnection)();
//app uses
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//app uses routes
app.use("/user", userRoute_1.userRoute);
app.use("/login", loginRoute_1.loginRoute);
app.use("/tasks", taskRoute_1.taskRoutes);
//sever port
const PORT = Number(process.env.PORT || 2002);
app.listen(PORT, () => {
    console.log({ message: `Server running... at ${PORT} port` });
});
