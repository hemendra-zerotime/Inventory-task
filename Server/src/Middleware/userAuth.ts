import { NextFunction, Request, Response } from "express";
import User from "../Model/userModel";
import bcrypt from "bcrypt";
import { generateToken, verifyToken } from "../utils/jwtToken";
declare global {
    namespace Express {
        interface Request {
            userId: String;
        }
    }
}

//traditional authentication
export const loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (user !== null) {
            const isPassValid = await bcrypt.compare(password, `${user?.password}`);
            if (isPassValid) {
                const token = generateToken(user);
                res
                    .cookie("authtoken", token, {
                        secure: true,
                        httpOnly: true,
                        sameSite: "none",
                    })
                    .status(200)
                    .json({
                        message: "login success",
                    });
            } else {
                res.status(401).json({
                    message: "Invalid Credential!",
                });
            }
        } else if (!user) {
            res.status(401).json({
                message: "Invalid Credential!",
            });
        }
    } catch (error) {
        next(error);
    }
};

//token based authentication
export const isLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authtoken = req.headers.authorization?.split(" ")[1];
    if (authtoken == undefined) {
        res.status(401).json({ message: "authentication require" });
    } else {
        try {
            const decode = verifyToken(authtoken);
            if (typeof decode === "object") {
                req.userId = decode.id;
                next();
            }
        } catch (error) {
            if (error instanceof Error) {
                res.status(401).json({ message: error.message });
            } else {
                next(error);
            }
        }
    }
};

//authorization
export const isAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { userId } = req;
    try {
        const user = await User.findOne({ _id: userId }, { _id: 0, role: 1 });
        if (user == null) {
            res.status(401).json({ message: "authentication required" });
        } else {
            user.role === "admin"
                ? next()
                : res.status(403).json({ message: "only admin can access" });
        }
    } catch (error) {
        next(error);
    }
};
