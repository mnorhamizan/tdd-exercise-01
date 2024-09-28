import { Cart } from "../models/Cart";
import { Product } from "../models/Product";

export class CartRepository {
  private carts: Cart[] = [];

  async findAll(): Promise<Cart[]> {
    return this.carts;
  }

  async findById(id: number): Promise<Cart | undefined> {
    return this.carts.find(cart => cart.id === id);
  }

  async create(): Promise<Cart> {
    const newCart = new Cart(this.generateId());
    newCart.id = this.generateId();
    this.carts.push(newCart);
    return newCart;
  }

  async addProduct(cartId: number, product: Product): Promise<Cart | undefined> {
    const cart = await this.findById(cartId);
    if (cart) {
      cart.addProduct(product);
      return cart;
    }
    return undefined;
  }

  async removeProduct(cartId: number, product: Product): Promise<Cart | undefined> {
    const cart = await this.findById(cartId);
    if (cart) {
      cart.removeProduct(product);
      return cart;
    }
    return undefined;
  }

  async delete(id: number): Promise<boolean> {
    const index = this.carts.findIndex(c => c.id === id);
    if (index !== -1) {
      this.carts.splice(index, 1);
      return true;
    }
    return false;
  }

  private generateId(): number {
    return Math.max(0, ...this.carts.map(c => c.id)) + 1;
  }
}