import express from 'express';
import cors from 'cors';
import { createProductRoutes } from './router/ProductRouter';
import { createCartRoutes } from './router/CartRouter';
import { ProductController } from './controllers/ProductController';
import { CartController } from './controllers/CartController';
import { ProductRepository } from './repositories/ProductRepository';
import { CartRepository } from './repositories/CartRepository';
import { ProductService } from './services/ProductService';
import { CartService } from './services/CartService';

export const createApp = () => {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Dependencies
  const productRepository = new ProductRepository();
  const productService = new ProductService(productRepository);
  const productController = new ProductController(productService);

  const cartRepository = new CartRepository();
  const cartService = new CartService(cartRepository);
  const cartController = new CartController(cartService, productService);

  // Routes
  app.use('/products', createProductRoutes(productController));
  app.use('/carts', createCartRoutes(cartController));

  return app;
};