import express from "express";
import {
    validateInput,
    validationRulesSignUp,
    validationRulesLogIn,
} from "../Middleware/inputValidation";
import { createUser, isAlreadyRegistered } from "../controller/userController";
import { loginUser } from "../Middleware/userAuth";

const userRoute = express.Router();

userRoute
    .route("/signup")
    .post(validationRulesSignUp, validateInput, isAlreadyRegistered, createUser);
userRoute.route("/login").post(validationRulesLogIn, validateInput, loginUser);

export default userRoute;
