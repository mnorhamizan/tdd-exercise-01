import { Router } from "express";
import { ProductController } from "../controllers/ProductController";

export const createProductRoutes = (productController: ProductController): Router => {
  const router = Router();

  router.get("/", productController.getAllProducts.bind(productController));
  router.get("/:id", productController.getProductById.bind(productController));
  router.post("/", productController.createProduct.bind(productController));
  router.put("/:id", productController.updateProduct.bind(productController));
  router.delete("/:id", productController.deleteProduct.bind(productController));

  return router;
}