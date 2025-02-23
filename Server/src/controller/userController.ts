import { Request, Response, NextFunction } from "express"
import User from "../Model/userModel"
import bcrypt from "bcrypt"

export const isAlreadyRegistered = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body
    try {
        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
            res.status(409).json({ message: "The email is already registered" })
        }
        next()
    } catch (error) {
        next(error)
    }
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password, role } = req.body
    try {
        const hashpass = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            username: username,
            email: email,
            password: hashpass,
            role: role
        })
        res.status(201).json({
            message: `User signup success`,
            data: newUser
        })

    } catch (error) {
        next(error)
    }
}

