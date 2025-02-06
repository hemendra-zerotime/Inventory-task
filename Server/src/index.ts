import express, { ErrorRequestHandler, NextFunction, Request, Response } from "express"
import "dotenv/config"
import productRoute from "./Router/productRoute"
import { dbConnect } from "./db/connection"
import cors from "cors"
import cookieParse from "cookie-parser"
import userRoute from "./Router/userRout"
const Port = process.env.PORT
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(cookieParse())
app.use(cors({
    credentials: true
}))
dbConnect()
app.use("/api", userRoute)
app.use("/api", productRoute)
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack)
    res.status(500).json({ message: "Internal server error" })
})
app.listen(Port, () => {
    console.log(`server stated at http://localhost:${Port}`)
})