import express from "express"
import "dotenv/config"
import productRoute from "./Router/product"
import { dbConnect } from "./db/connection"
import cors from "cors"
import cookieParse from "cookie-parser"
import userRoute from "./Router/user"
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

app.listen(Port, () => {
    console.log(`server stated at http://localhost:${Port}`)
})