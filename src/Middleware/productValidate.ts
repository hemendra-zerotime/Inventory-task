import { body, validationResult } from "express-validator";

import { NextFunction, Request, Response } from "express";
export const productRules = [

    body("name")
        .isLength({ min: 5 })
        .withMessage("Name should be of minmum of five character"),
    body("category")
        .isLength({ min: 5 })
        .withMessage("category should be of minmum of five character"),
    body("price")
        .notEmpty()
        .withMessage("Price is require"),
    body("stock")
        .notEmpty()
        .withMessage("Stock is require")
]

export const Validate = (req: Request, res: Response, next: NextFunction) => {

    const err = validationResult(req)
    if (!err.isEmpty()) {
        res.status(400).json({ validationError: err.array() })
    }
    else {
        next()
    }
};
