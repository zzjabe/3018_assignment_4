import request from "supertest";
import express, { Express } from "express";
import loanRoutes from "../src/api/v1/routes/loanRoutes";
import adminRoutes from "../src/api/v1/routes/adminRoutes";
import { HTTP_STATUS } from "../src/constants/httpConstants";

jest.mock("firebase-admin/app", () => ({
    initializeApp: jest.fn(),
    cert: jest.fn(),
}));

jest.mock("firebase-admin/auth", () => ({
    getAuth: jest.fn(() => ({
        setCustomUserClaims: jest.fn().mockResolvedValue(true),
        verifyIdToken: jest.fn().mockResolvedValue({ uid: "mockUid", role: "user" }),
    })),
}));

jest.mock("firebase-admin/firestore", () => ({
    getFirestore: jest.fn(() => ({
        collection: jest.fn(() => ({
            doc: jest.fn(() => ({
                set: jest.fn(),
                get: jest.fn(),
                update: jest.fn(),
                delete: jest.fn(),
            })),
        })),
    })),
}));

jest.mock("../src/api/v1/middleware/authenticate", () => ({
    authenticate: (req: any, res: any, next: any) => {
        res.locals.uid = "mockUid";
        res.locals.role = req.headers["x-mock-role"] || "user";
        next();
    },
}));

jest.mock("../src/api/v1/middleware/authorize", () => ({
    isAuthorized: (opts: any) => (req: any, res: any, next: any) => {
        const role = res.locals.role;
        if (opts.hasRole.includes(role)) return next();
        return res.status(403).json({ error: "Forbidden: Insufficient role" });
    },
}));

const app: Express = express();
app.use(express.json());
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/loans", loanRoutes);

describe("API Routes Authorization Tests", () => {
    it("should allow admin to set custom claims", async () => {
        const response = await request(app)
            .post("/api/v1/admin/setCustomClaims")
            .set("x-mock-role", "admin")
            .send({ uid: "123", claims: { role: "manager" } });

        expect(response.status).toBe(HTTP_STATUS.OK);
        expect(response.body.message).toContain("Custom claims set for user");
    });

    it("should forbid non-admin from setting claims", async () => {
        const response = await request(app)
            .post("/api/v1/admin/setCustomClaims")
            .set("x-mock-role", "user")
            .send({ uid: "123", claims: { role: "manager" } });

        expect(response.status).toBe(403);
        expect(response.body.error).toBe("Forbidden: Insufficient role");
    });
});