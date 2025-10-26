import express, { Router } from "express";
import {getLoans, 
        createLoan, 
        reviewLoan, 
        approveLoan} 
from "../controllers/loanController"

const router: Router = express.Router();

router.get("/", getLoans);

router.post("/", createLoan);

router.put("/:id/review", reviewLoan);

router.put("/:id/approve", approveLoan);

export default router;