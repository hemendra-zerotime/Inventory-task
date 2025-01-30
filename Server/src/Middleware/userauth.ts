import { NextFunction, Request, Response } from 'express'
import User from '../Model/User'
import bcrypt from "bcrypt"
import jwt, { JsonWebTokenError, JwtPayload } from 'jsonwebtoken'
declare global {
    namespace Express {
        interface Request {
            userId: String
        }
    }
}
export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email: email })
        if (user) {
            const isPassValid = await bcrypt.compare(password, `${user?.password}`)
            if (isPassValid) {
                const token: String = await new Promise((resolve, reject) => {
                    jwt.sign({ id: user._id, role: user.role }, `${process.env.SECRET_KEY}`, { expiresIn: "1h" }, (err, token) => {
                        if (err) reject(err)
                        else
                            resolve(`${token}`)
                    })
                })
                res.cookie("authtoken", token, { secure: true, httpOnly: true }).status(200).json({
                    message: "login success",
                })
            }
            else {
                res.status(401).json({
                    message: "Invalid Credential!"
                })
            }
        }
        else if (!user) {
            res.status(401).json({
                message: "Invalid Credential!"
            })
        }
    } catch (error) {
        console.log(error)
    }
}

//token based authentication
export const isLogin = async (req: Request, res: Response, next: NextFunction) => {
    const authtoken = req.headers.authorization?.split(" ")[1]
    if (authtoken) {
        try {
            const decode = await new Promise<JwtPayload | string>((resolve, reject) => {
                jwt.verify(authtoken, process.env.SECRET_KEY as string, (err: JsonWebTokenError | null, decoded: JwtPayload | string | undefined) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(decoded as JwtPayload);
                    }
                });
            });
            if (typeof decode === "object") {
                req.userId = decode.id
                next()
            }
        } catch (error) {
            if (error instanceof JsonWebTokenError) {
                res.status(401).json({ message: error.message })
            }
        }
    }
    else {
        res.status(401).json({ message: "authentication require" })
    }
}


//for role based Authentication
export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req
    try {
        const user = await User.findOne({ _id: userId }, { _id: 0, role: 1 })
        if (user == null) {
            res.status(401).json({ message: "authentication required" })
        }
        else {
            user.role === "admin" ? next() : res.status(403).json({ message: "only admin can access" })
        }

    } catch (error) {
        console.log(error)
    }
}