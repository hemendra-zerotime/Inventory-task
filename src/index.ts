import express from "express"
import "dotenv/config"
import router from "./Router/product"
import { dbConnect } from "./db/connection"

const Port = process.env.PORT
const app = express()
app.use(express.urlencoded())
dbConnect()
app.use("/api", router)
app.listen(Port, () => {
    console.log(`server stated at http://localhost:${Port}`)
})