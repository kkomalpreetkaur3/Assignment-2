import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import { HTTP_STATUS } from "./constants/httpConstants";
import ticketRoutes from "./api/v1/routes/ticketRoutes";

const app: Express = express();

app.use(morgan("combined"));
app.use(express.json());

app.get("/api/v1/health", (req: Request, res: Response) => {
  res.status(HTTP_STATUS.OK).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

app.use("/api/v1", ticketRoutes);

export default app;
