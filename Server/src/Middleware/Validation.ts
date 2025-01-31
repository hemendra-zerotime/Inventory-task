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

export const Validate = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    const err = validationResult(req)
    if (!err.isEmpty()) {
        res.status(400).json({ validationError: err.array() })
    }
    else {
        next()
    }
};

