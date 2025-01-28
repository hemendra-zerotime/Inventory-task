import express from "express"
import "dotenv/config"
import productRoute from "./Router/product"
import { dbConnect } from "./db/connection"
import cors from "cors"
import userRoute from "./Router/user"
const Port = process.env.PORT
const app = express()
app.use(express.urlencoded())
app.use(cors())
dbConnect()
app.use("/api", userRoute)
app.use("/api", productRoute)

app.listen(Port, () => {
    console.log(`server stated at http://localhost:${Port}`)
})