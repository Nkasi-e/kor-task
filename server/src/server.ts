import dotenv from "dotenv";
import http from "http";
import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import {
  handleAPIHealthChecks,
  handleAPIWhitlistEndponts,
} from "./middleware/health-check";
dotenv.config();

import authRouter from "./api/auth";
import userRouter from "./api/user";

const app: Application = express();
const server = http.createServer(app);

//middlewares
app.disable("x-powered-by");
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({}));

// Routes
app.use("/v1/auth", authRouter);
app.use("/v1/user", userRouter);

// Health Check
app.get("/v1/ping", handleAPIHealthChecks);
app.get("*", handleAPIWhitlistEndponts);

export { server, app };
