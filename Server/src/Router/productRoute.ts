import express from "express";
import {
  addProduct,
  deleteProductById,
  updateProduct,
  viewAllProduct,
  viewAnalytics,
  viewProductById,
} from "../controller/productController";
import { validateInput, productRules } from "../Middleware/inputValidation";
import { isAdmin, isLogin } from "../Middleware/userAuth";

const productRoute = express.Router();
productRoute.use("/products", isLogin, isAdmin);

productRoute.route("/products/analytics").get(viewAnalytics)

productRoute
  .route("/products")
  .get(viewAllProduct)
  .post(productRules, validateInput, addProduct);

productRoute
  .route("/products/:id")
  .get(viewProductById)
  .put(productRules, validateInput, updateProduct)
  .delete(deleteProductById);

export default productRoute;
