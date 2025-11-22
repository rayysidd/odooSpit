import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
} from "../controller/productController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(authMiddleware, getProducts)
  .post(authMiddleware, createProduct);

router.route("/:id")
  .get(authMiddleware, getProductById)
  .put(authMiddleware, updateProduct);

export default router;