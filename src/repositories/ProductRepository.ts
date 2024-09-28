import { Product } from "../models/Product";

export class ProductRepository {
  private products: Product[] = [];

  async findAll(): Promise<Product[]> {
    return this.products;
  }

  async findById(id: number): Promise<Product | undefined> {
    return this.products.find(product => product.id === id);
  }

  async create(product: Omit<Product, "id">): Promise<Product> {
    const newProduct = { ...product, id: this.generateId() };
    this.products.push(newProduct);
    return newProduct;
  }

  async update(id: number, product: Partial<Product>): Promise<Product | undefined> {
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...product };
      return this.products[index];
    }
    return undefined;
  }

  async delete(id: number): Promise<boolean> {
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      return true;
    }
    return false;
  }

  private generateId(): number {
    return Math.max(0, ...this.products.map(p => p.id)) + 1;
  }
}