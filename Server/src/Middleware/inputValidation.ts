import { body, validationResult } from "express-validator";

import { NextFunction, Request, Response } from "express";
import { Category } from "../Model/Product";
export const productRules = [

    body("name")
        .isLength({ min: 3 })
        .withMessage("Name should be of minmum of three character"),
    body("category")
        .isLength({ min: 3 })
        .withMessage("category should be of minmum of three character")
        .isIn([Category.Beverages, Category.Home, Category.Toys])
        .withMessage(`category should be in ${Category.Beverages}, ${Category.Home}, ${Category.Toys}`),
    body("price")
        .notEmpty()
        .withMessage("Price is require"),
    body("stock")
        .notEmpty()
        .withMessage("Stock is require")

]
export const validationRulesLogIn = [
    body("email")
        .isEmail()
        .withMessage("please enter valid email"),
    body("password")
        .notEmpty()
        .withMessage("please enter password")

];
export const validationRulesSignUp = [
    body("username")
        .isLength({ min: 5 })
        .withMessage("username must be of minimum five character"),
    body("email")
        .isEmail()
        .withMessage("please enter valid email"),
    body("password")
        .isLength({ min: 6, max: 10 })
        .withMessage("Password lenght must be in 6-10"),
    body("role")
        .optional()
        .isIn(["user", "admin"])
        .withMessage("role should be user or admin")
];

export const validateInput = (req: Request, res: Response, next: NextFunction) => {
    const err = validationResult(req)
    if (!err.isEmpty()) {
        res.status(400).json({ validationError: err.array() })
    }
    else {
        next()
    }
};

