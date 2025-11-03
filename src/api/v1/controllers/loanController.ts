import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";

export const getLoans = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    res.status(HTTP_STATUS.OK).json({message:`Got all loans successfully.`});
};

export const createLoan = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const newLoan = req.body;
    res.status(HTTP_STATUS.CREATED).json({
        message: "Loan created successfully",
        loan: newLoan,
    });
};

export const reviewLoan = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try{
        const { id } = req.params;
        if(!id) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                error: `Loan ${id} not found.`
            });
            return;
        };

        res.status(HTTP_STATUS.OK).json({
            message: `Loan ${id} has been reviewed.`
        });
    } catch (error) {
        next(error);
    };
};

export const approveLoan = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try{
        const { id } = req.params;
        if(!id) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                error: `Loan ${id} not found.`
            });
            return;
        };

        res.status(HTTP_STATUS.OK).json({
            message: `Loan ${id} has been approved.`
        });
    } catch (error) {
        next(error);
    };
};