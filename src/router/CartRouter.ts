import { Router } from 'express';
import { CartController } from '../controllers/CartController';

export const createCartRoutes = (cartController: CartController) => {
  const router = Router();

  router.get('/', cartController.getAllCarts.bind(cartController));
  router.get('/:id', cartController.getCartById.bind(cartController));
  router.post('/', cartController.createCart.bind(cartController));
  router.post('/:id/products', cartController.addProductToCart.bind(cartController));
  router.delete('/:id/products/:productId', cartController.removeProductFromCart.bind(cartController));
  router.delete('/:id', cartController.deleteCart.bind(cartController));

  return router;
};