import jwt, { JwtPayload } from "jsonwebtoken"
import { IUser } from "../Model/User"

export const generateToken = (user: IUser): String => {
    return jwt.sign({ id: user._id, role: user.role }, `${process.env.SECRET_KEY}`, { expiresIn: "3h" })
}

export const verifyToken = (authtoken: string): string | JwtPayload => {
    return jwt.verify(authtoken, `${process.env.SECRET_KEY}`)
}