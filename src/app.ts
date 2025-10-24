import express, { Request, Response, Express } from "express";
import loanRoutes from "./api/v1/routes/loanRoutes"

// Initialize Express application
const app: Express = express();

app.use("/api/v1/loans", loanRoutes);

app.get("/api/v1/health", (req: Request, res: Response) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

export default app;