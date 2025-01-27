import express from "express"
import { addProduct, deleteProductById, viewAllProduct, viewProductById } from "../controller/product"
const router = express.Router()

router.route("/products").get(viewAllProduct).post(addProduct)
router.route("/products/:id").get(viewProductById).put().delete(deleteProductById)


export default router