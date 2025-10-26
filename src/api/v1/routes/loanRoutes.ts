import express, { Router } from "express";
import {getLoans, 
        createLoan, 
        reviewLoan, 
        approveLoan} 
from "../controllers/loanController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize"

const router: Router = express.Router();

router.get("/", authenticate, isAuthorized({ hasRole: ["manager", "officer"]}), getLoans);

router.post("/", authenticate, isAuthorized({ hasRole: ["user"]}), createLoan);

router.put("/:id/review", authenticate, isAuthorized({ hasRole: ["officer"]}), reviewLoan);

router.put("/:id/approve", authenticate, isAuthorized({ hasRole: ["manager"]}), approveLoan);

export default router;