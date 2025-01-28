import express from "express"
import { Validate, validationRulesSignUp } from "../Middleware/Validation"
import { isAlreadyRegistered } from "../controller/user"

const userRoute = express.Router()

userRoute.route("/signup").post(validationRulesSignUp, Validate, isAlreadyRegistered)

export default userRoute