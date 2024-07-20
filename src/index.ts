import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { dbConnection } from "./database/db";
import { userRoute } from "./routers/userRoute";
import { loginRoute } from "./routers/loginRoute";
import { taskRoutes } from "./routers/taskRoute";

dotenv.config({ path: "./src/.env" });

//Instace express
const app = express();

//database connection
dbConnection();

//app uses
app.use(express.json());
app.use(cors({
    origin: "*"
}));

//app uses routes
app.use("/user", userRoute);
app.use("/auth", loginRoute);
app.use("/tasks", taskRoutes);

//sever port
const PORT: number = Number(process.env.PORT || 2002);
app.listen(PORT, () => {
  console.log({ message: `Server running... at ${PORT} port` });
});
