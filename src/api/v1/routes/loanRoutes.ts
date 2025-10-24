import express, { Router } from "express";

const router: Router = express.Router();

router.get("/");

router.post("/");

router.put("/:id/review");

router.put("/:id/approve");

export default router;