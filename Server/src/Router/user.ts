import express from "express"
import { Validate, validationRulesSignUp, validationRulesLogIn } from "../Middleware/Validation"
import { createUser, isAlreadyRegistered } from "../controller/user"
import { loginUser } from "../Middleware/userauth"

const userRoute = express.Router()

userRoute.route("/signup").post(validationRulesSignUp, Validate, isAlreadyRegistered, createUser)
userRoute.route("/login").post(validationRulesLogIn, Validate, loginUser)


export default userRoute