import express from "express";
import {
  addProduct,
  deleteProductById,
  updateProduct,
  viewAllProduct,
  viewLowStock,
  viewProductById,
} from "../controller/product";

import { Validate, productRules } from "../Middleware/Validation";
import { isAdmin, isLogin } from "../Middleware/userauth";
const productRoute = express.Router();
productRoute.use("/", isLogin, isAdmin);
productRoute.route("/products/low-stock").get(viewLowStock)
productRoute
  .route("/products")
  .get(viewAllProduct)
  .post(productRules, Validate, addProduct);
productRoute
  .route("/products/:id")
  .get(viewProductById)
  .put(productRules, Validate, updateProduct)
  .delete(deleteProductById);
export default productRoute;
