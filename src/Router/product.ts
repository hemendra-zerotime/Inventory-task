import express from "express"
import { addProduct, deleteProductById, updateProduct, viewAllProduct, viewProductById } from "../controller/product"
import { Validate, productRules } from "../Middleware/productValidate"
const router = express.Router()
router.route("/products").get(viewAllProduct).post(productRules, Validate, addProduct)
router.route("/products/:id").get(viewProductById).put(productRules, Validate, updateProduct).delete(deleteProductById)


export default router