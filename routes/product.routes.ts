import { Router } from "express";
import {
  createProduct,
  getProductById,
  getProducts,
  toggleProductStatus,
  updateProductById,
} from "../controllers/product.controller";

const router = Router();
router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProductById);
router.put("/:id/toggle-status", toggleProductStatus);

export default router;
