import { Request, Response, NextFunction } from "express"
import User from "../Model/User"
export const isAlreadyRegistered = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body
    try {
        const existingUser = await User.findOne({ email: email })
        if (existingUser) throw Error
        next()
    } catch (error) {
        res.status(409).json({ message: "The email is already registered" })
    }
}

export const createUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body
    try {

    } catch (error) {

    }
}