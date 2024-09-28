import { Cart } from "../models/Cart";
import { Money } from "../models/Money";
import { Product } from "../models/Product";
import { CartRepository } from "../repositories/CartRepository";

export class CartService {
  constructor(private cartRepository: CartRepository) {}

  async getAllCarts(): Promise<Cart[]> {
    return this.cartRepository.findAll();
  }

  async getCartById(id: number): Promise<Cart | undefined> {
    return this.cartRepository.findById(id);
  }

  async createCart(): Promise<Cart> {
    return this.cartRepository.create();
  }

  async addProductToCart(cartId: number, product: Product): Promise<Cart | undefined> {
    return this.cartRepository.addProduct(cartId, product);
  }

  async removeProductFromCart(cartId: number, product: Product): Promise<Cart | undefined> {
    return this.cartRepository.removeProduct(cartId, product);
  }

  async deleteCart(id: number): Promise<boolean> {
    return this.cartRepository.delete(id);
  }

async checkoutCart(id: number, payAmount: Money): Promise<Cart | undefined> {
    const cart = await this.cartRepository.findById(id);

    if (!cart) {
      return undefined;
    }

    const totalPrice = cart.getTotalPrice();

    if (payAmount.lessThan(totalPrice)) {
      throw new Error("Insufficient payment");
    }

    cart.checkout(payAmount);
    return cart;
  }
}