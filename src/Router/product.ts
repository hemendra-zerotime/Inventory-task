import express from "express"
import { addProduct, deleteProductById, updateProduct, viewAllProduct, viewProductById } from "../controller/product"
import { Validate, productRules } from "../Middleware/Validation"
const productRoute = express.Router()
productRoute.route("/products").get(viewAllProduct).post(productRules, Validate, addProduct)
productRoute.route("/products/:id").get(viewProductById).put(productRules, Validate, updateProduct).delete(deleteProductById)


export default productRoute