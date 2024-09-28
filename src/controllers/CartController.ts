import { Request, Response } from "express";
import { CartService } from "../services/CartService";
import { ProductService } from "../services/ProductService";
import { Money } from "../models/Money";

export class CartController {
  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}

  async getAllCarts(req: Request, res: Response): Promise<void> {
    try {
      const carts = await this.cartService.getAllCarts();
      res.json(carts);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getCartById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const cart = await this.cartService.getCartById(id);
      if (cart) {
        res.json(cart);
      } else {
        res.status(404).json({ error: "Cart not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async createCart(req: Request, res: Response): Promise<void> {
    try {
      const cart = await this.cartService.createCart();
      res.status(201).json(cart);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async addProductToCart(req: Request, res: Response): Promise<void> {
    try {
      const cartId = parseInt(req.params.id);
      const productId = parseInt(req.body.productId);
      const product = await this.productService.getProductById(productId);
      if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
      }
      const updatedCart = await this.cartService.addProductToCart(cartId, product);
      if (updatedCart) {
        res.json(updatedCart);
      } else {
        res.status(404).json({ error: "Cart not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async removeProductFromCart(req: Request, res: Response): Promise<void> {
    try {
      const cartId = parseInt(req.params.id);
      const productId = parseInt(req.params.productId);
      const product = await this.productService.getProductById(productId);
      if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
      }
      const updatedCart = await this.cartService.removeProductFromCart(cartId, product);
      if (updatedCart) {
        res.json(updatedCart);
      } else {
        res.status(404).json({ error: "Cart not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteCart(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const deleted = await this.cartService.deleteCart(id);
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: "Cart not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async checkoutCart(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const payAmount = parseInt(req.body.payAmount);
      const cart = await this.cartService.getCartById(id);

      if (!cart) {
        res.status(404).json({ error: "Cart not found" });
        return;
      }

      const updatedCart = await this.cartService.checkoutCart(id, new Money(payAmount, "MYR"));
      if (updatedCart) {
        res.json(updatedCart.toJSON());
      } else {
        res.status(404).json({ error: "Cart not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}