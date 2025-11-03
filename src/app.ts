import express, { Request, Response, Express } from "express";
import loanRoutes from "./api/v1/routes/loanRoutes"
import adminRoutes from "./api/v1/routes/adminRoutes"
import {
    accessLogger,
    errorLogger,
    consoleLogger,
} from "./api/v1/middleware/logger";
import errorHandler from "./api/v1/middleware/errorHandler";

// Initialize Express application
const app: Express = express();

// Logging middleware (should be applied early in the middleware stack)
if (process.env.NODE_ENV === "production") {
    // In production, log to files
    app.use(accessLogger);
    app.use(errorLogger);
} else {
    // In development, log to console for immediate feedback
    app.use(consoleLogger);
}

// Body parsing middleware
app.use(express.json());

app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/loans", loanRoutes);

app.get("/api/v1/health", (req: Request, res: Response) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

// Global error handling middleware (MUST be applied last)
app.use(errorHandler);

export default app;